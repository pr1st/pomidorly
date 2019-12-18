export const START_FETCHING = "START_FETCHING";
export const END_FETCHING = "END_FETCHING";


// actions
export interface StartFetchingAction {
    type: typeof START_FETCHING
}

export interface EndFetchingAction {
    type: typeof END_FETCHING
}

export type FetchActions =
    StartFetchingAction |
    EndFetchingAction

// state
export type FetchState = boolean