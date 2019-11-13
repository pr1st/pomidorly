import {CurrentPageActions, CurrentPageState, SIGN_UP} from "../types/currentPage";

export const currentPage = (state: CurrentPageState = SIGN_UP, action: CurrentPageActions) : string => {
    if (action.type === "CHANGE_PAGE") {
        return action.page
    } else {
        return state
    }
}