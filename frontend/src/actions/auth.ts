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

function localSignIn(userName: string, token: {token:string, expiresIn: number}) : SignInAction {
    return {
        type: SIGN_IN,
        userName,
        token
    }
}

function localRefreshToken(token: {token:string, expiresIn: number}) : RefreshTokenAction {
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

    }
}

export function signUp(userName: string, password: string) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {

    }
}

export function signIn(userName: string, password: string) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {

    }
}