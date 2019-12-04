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
import {fetchCurrentTasks} from "./currentTasks";
import {fetchHistoryTasks} from "./historyTasks";

type Token = {
    token: string,
    expiresIn: number
}

function localSignIn(userName: string, token: Token): SignInAction {
    return {
        type: SIGN_IN,
        userName,
        token
    }
}

function localRefreshToken(token: Token): RefreshTokenAction {
    return {
        type: REFRESH_TOKEN,
        token
    }
}

function localLogOut(): LogOutAction {
    return {
        type: LOG_OUT
    }
}

export function setErrorMessage(message: string): SetErrorMessageAction {
    return {
        type: SET_ERROR_MESSAGE,
        message
    }
}

export function logOut() {
    return (dispatch: Dispatch<any>) => {
        return Promise.resolve()
            .then(() => {
                closeInterval();
                dispatch(localLogOut());
            })
    }
}

export function refreshToken() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        if (getState().auth.userName === "") {
            return Promise.resolve()
        }
        return request(
            dispatch,
            "POST",
            "auth/refresh",
            {
                [ACCEPT]: APPLICATION_JSON,
                [TOKEN]: getState().auth.token.token
            },
        )
            .then(res => {
                if (res.headers[CONTENT_TYPE] === APPLICATION_JSON) {
                    return res.data;
                } else {
                    throw Promise.reject("No Content-type header");
                }
            })
            .then(res => {
                const token = (res as Token);
                dispatch(localRefreshToken(token));
                startInterval(() => {
                    dispatch(refreshToken());
                }, token.expiresIn - 1000)
            })
            .catch(unAuthorisedAction(dispatch))
            .catch(lastCatchResponseError(dispatch));
    }
}

export function signUp(userName: string, password: string) {
    return (dispatch: Dispatch<any>) => {
        return request(
            dispatch,
            "POST",
            "auth/signup",
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
                    throw error;
                }
            })
            .catch(lastCatchResponseError(dispatch));
    }
}

export function signIn(userName: string, password: string) {
    return (dispatch: Dispatch<any>) => {
        return request(
            dispatch,
            "POST",
            "auth/signin",
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
                    return res.data;
                } else {
                    throw Promise.reject("No Content-type header");
                }
            })
            .then(res => {
                const token = (res as Token);
                dispatch(localSignIn(userName, token));
                dispatch(fetchTimerConfig());
                dispatch(changePageToMain());
                dispatch(fetchCurrentTasks());
                dispatch(fetchHistoryTasks());
                startInterval(() => {
                    dispatch(refreshToken());
                }, token.expiresIn - 1000)
            })
            .catch(error => {
                if (error.response.status === 404) {
                    dispatch(setErrorMessage("Combination login/password is not correct"));
                } else {
                    throw error;
                }
            })
            .catch(lastCatchResponseError(dispatch));
    }
}

let intervalId: any;

function startInterval(callback: any, time: number) {
    intervalId = setInterval(() => {
        callback();
        closeInterval();
    }, time)
}

function closeInterval() {
    clearInterval(intervalId)
}