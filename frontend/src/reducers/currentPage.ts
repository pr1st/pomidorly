import { CurrentPageState, SIGN_IN, SIGN_UP, CHANGE_PAGE} from "../types/currentPage";
import { AppActions } from "../types";
import { LOG_OUT } from "../types/auth";

export const currentPage = (state: CurrentPageState = SIGN_UP, action: AppActions): string => {
    if (action.type === LOG_OUT) {
        return SIGN_IN
    } else if (action.type === CHANGE_PAGE) {
        return action.page
    } else {
        return state
    }
};