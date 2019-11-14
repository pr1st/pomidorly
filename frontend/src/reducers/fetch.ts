import {END_FETCHING, FetchActions, START_FETCHING} from "../types/fetch";

export const fetching = (state: boolean = false, action: FetchActions) : boolean => {
    if (action.type === START_FETCHING) {
        return true
    } else if (action.type === END_FETCHING) {
        return false
    } else {
        return state
    }
}