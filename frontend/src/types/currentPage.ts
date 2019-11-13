
export const CHANGE_PAGE = "CHANGE_PAGE";

// pages
export const MAIN_PAGE = "MAIN_PAGE";
export const STATISTICS_PAGE = "STATISTICS_PAGE";
export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";

// actions
export interface ChangePageToMainAction {
    type: typeof CHANGE_PAGE
    page: typeof MAIN_PAGE
}

export interface ChangePageToStatisticsAction {
    type: typeof CHANGE_PAGE
    page: typeof STATISTICS_PAGE
}

export interface ChangePageToSignUpAction {
    type: typeof CHANGE_PAGE
    page: typeof SIGN_UP
}

export interface ChangePageToSignInAction {
    type: typeof CHANGE_PAGE
    page: typeof SIGN_IN
}

export type CurrentPageActions =
    ChangePageToMainAction |
    ChangePageToStatisticsAction |
    ChangePageToSignInAction |
    ChangePageToSignUpAction

// state
export type CurrentPageState = string