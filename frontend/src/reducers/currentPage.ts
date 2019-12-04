import {CurrentPageActions, CurrentPageState, SIGN_IN, SIGN_UP} from "../types/currentPage";
import {LogOutAction} from "../types/auth";

export const currentPage = (state: CurrentPageState = SIGN_UP, action: CurrentPageActions | LogOutAction): string => {
    if (action.type === "LOG_OUT") {
        return SIGN_IN
    } else if (action.type === "CHANGE_PAGE") {
        return action.page
    } else {
        return state
    }
};