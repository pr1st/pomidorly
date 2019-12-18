import {END_FETCHING, START_FETCHING} from "../types/fetch";
import { AppActions } from "../types";

export const fetching = (state: boolean = false, action: AppActions): boolean => {
    if (action.type === START_FETCHING) {
        return true
    } else if (action.type === END_FETCHING) {
        return false
    } else {
        return state
    }
}