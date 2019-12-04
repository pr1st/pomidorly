import {
    CHANGE_PAGE,
    ChangePageToMainAction,
    ChangePageToSignInAction,
    ChangePageToSignUpAction,
    ChangePageToStatisticsAction,
    MAIN_PAGE,
    SIGN_IN,
    SIGN_UP,
    STATISTICS_PAGE
} from "../types/currentPage";


export function changePageToMain(): ChangePageToMainAction {
    return {
        type: CHANGE_PAGE,
        page: MAIN_PAGE
    }
}

export function changePageToStatistics(): ChangePageToStatisticsAction {
    return {
        type: CHANGE_PAGE,
        page: STATISTICS_PAGE
    }
}

export function changePageToSignIn(): ChangePageToSignInAction {
    return {
        type: CHANGE_PAGE,
        page: SIGN_IN
    }
}

export function changePageToSignUp(): ChangePageToSignUpAction {
    return {
        type: CHANGE_PAGE,
        page: SIGN_UP
    }
}
