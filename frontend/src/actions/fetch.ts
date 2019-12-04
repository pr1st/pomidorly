import {END_FETCHING, EndFetchingAction, START_FETCHING, StartFetchingAction} from "../types/fetch";

export function startFetching(): StartFetchingAction {
    return {
        type: START_FETCHING
    }
}

export function endFetching(): EndFetchingAction {
    return {
        type: END_FETCHING
    }
}