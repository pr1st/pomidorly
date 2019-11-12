
export const CHANGE_PAGE = "CHANGE_PAGE";

// pages
export const MAIN_PAGE = "MAIN_PAGE";
export const STATISTICS_PAGE = "STATISTICS_PAGE";

// actions
export interface ChangePageToMainAction {
    type: typeof CHANGE_PAGE
    page: typeof MAIN_PAGE
}

export interface ChangePageToStatisticsAction {
    type: typeof CHANGE_PAGE
    page: typeof STATISTICS_PAGE
}

export type CurrentPageActions = ChangePageToMainAction | ChangePageToStatisticsAction

// state
export type CurrentPageState = string