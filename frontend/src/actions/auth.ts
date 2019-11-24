import {
    LOG_OUT,
    LogOutAction,
    REFRESH_TOKEN,
    RefreshTokenAction,
    SET_ERROR_MESSAGE,
    SetErrorMessageAction,
    SIGN_IN,
    SignInAction
} from "../types/auth";
import {AppState} from "../types";
import {Dispatch} from "react";
import {
    ACCEPT,
    APPLICATION_JSON,
    CONTENT_TYPE,
    lastCatchResponseError,
    request,
    TOKEN, unAuthorisedAction
} from "./request";
import {changePageToMain, changePageToSignIn} from "./currentPage";
import {fetchTimerConfig} from "./timer";

type Token = {
    token:string,
    expiresIn: number
}

function localSignIn(userName: string, token: Token) : SignInAction {
    return {
        type: SIGN_IN,
        userName,
        token
    }
}

function localRefreshToken(token: Token) : RefreshTokenAction {
    return {
        type: REFRESH_TOKEN,
        token
    }
}

export function logOut() : LogOutAction {
    return {
        type: LOG_OUT
    }
}

export function setErrorMessage(message: string) : SetErrorMessageAction {
    return {
        type: SET_ERROR_MESSAGE,
        message
    }
}



function refreshToken() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        if (getState().auth.userName === "") {
            return () => {}
        }
        return request(
            dispatch,
            "POST",
            "refresh",
            {
                [ACCEPT]: APPLICATION_JSON,
                [TOKEN]: getState().auth.token.token
            },
        )
            .then(res => {
                if (res.headers[CONTENT_TYPE] === APPLICATION_JSON) {
                    return res.data
                } else {
                    throw Promise.reject("No Content-type header");
                }
            })
            .then(res => {
                const token = (res as Token);
                dispatch(localRefreshToken(token));
                const interval = setInterval(() => {
                    dispatch(refreshToken())
                    clearInterval(interval)
                }, token.expiresIn - 1000)
            })
            .catch(unAuthorisedAction(dispatch))
            .catch(lastCatchResponseError(dispatch))
    }
}

export function signUp(userName: string, password: string) {
    return (dispatch: Dispatch<any>) => {
        return request(
            dispatch,
            "POST",
            "signup",
            {
                [CONTENT_TYPE]: APPLICATION_JSON
            },
            {
                login: userName,
                password: password
            }
        )
            .then(() => dispatch(changePageToSignIn()))
            .catch(error => {
            if (error.response.status === 409) {
                dispatch(setErrorMessage("User with this name already exists"));
            } else {
                throw error
            }})
            .catch(lastCatchResponseError(dispatch))
    }
}

export function signIn(userName: string, password: string) {
    return (dispatch: Dispatch<any>) => {
        return request(
            dispatch,
            "POST",
            "signin",
            {
                [CONTENT_TYPE]: APPLICATION_JSON,
                [ACCEPT]: APPLICATION_JSON
            },
            {
                login: userName,
                password: password
            }
        )
            .then(res => {
                if (res.headers[CONTENT_TYPE] === APPLICATION_JSON) {
                    return res.data
                } else {
                    throw Promise.reject("No Content-type header");
                }
            })
            .then(res => {
                const token = (res as Token);
                dispatch(localSignIn(userName, token));
                dispatch(fetchTimerConfig());
                dispatch(changePageToMain());
                const interval = setInterval(() => {
                    dispatch(refreshToken())
                    clearInterval(interval)
                }, token.expiresIn - 1000)
            })
            .catch(error => {
                if (error.response.status === 404) {
                    dispatch(setErrorMessage("Combination login/password is not correct"))
                } else {
                    throw error
                }
            })
            .catch(lastCatchResponseError(dispatch))
    }
}