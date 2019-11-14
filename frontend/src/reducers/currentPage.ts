import {CurrentPageActions, CurrentPageState, SIGN_IN, SIGN_UP} from "../types/currentPage";

export const currentPage = (state: CurrentPageState = SIGN_UP, action: CurrentPageActions) : string => {
    // hacks
    //@ts-ignore
    if (action.type === "LOG_OUT") {
        return SIGN_IN
    }
    if (action.type === "CHANGE_PAGE") {
        return action.page
    } else {
        return state
    }
}