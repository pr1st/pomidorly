import {CurrentPageActions, CurrentPageState, MAIN_PAGE} from "../types/currentPage";

export const currentPage = (state: CurrentPageState = MAIN_PAGE, action: CurrentPageActions) : string => {
    if (action.type === "CHANGE_PAGE") {
        return action.page
    } else {
        return state
    }
}