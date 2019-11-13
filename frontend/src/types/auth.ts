
export const SIGN_IN = "SIGN_IN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const LOG_OUT = "LOG_OUT";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";

// actions
export interface SignInAction {
    type: typeof SIGN_IN
    userName: string,
    token: {
        token: string,
        expiresIn: number
    }
}

export interface RefreshTokenAction {
    type: typeof REFRESH_TOKEN
    token: {
        token: string,
        expiresIn: number
    }
}

export interface LogOutAction {
    type: typeof LOG_OUT
}

export interface SetErrorMessageAction {
    type: typeof SET_ERROR_MESSAGE,
    message: string
}

export type AuthActions =
    SignInAction |
    RefreshTokenAction |
    LogOutAction |
    SetErrorMessageAction

// state
export type AuthState = {
    token: {
        token: string,
        expiresIn: number
    },
    userName: string,
    errorMessage: string
}