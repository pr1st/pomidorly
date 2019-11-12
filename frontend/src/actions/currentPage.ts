import {
    CHANGE_PAGE,
    ChangePageToMainAction,
    ChangePageToStatisticsAction,
    MAIN_PAGE,
    STATISTICS_PAGE
} from "../types/currentPage";


export function changePageToMain() : ChangePageToMainAction {
    return {
        type: CHANGE_PAGE,
        page: MAIN_PAGE
    }
}

export function changePageToStatistics() : ChangePageToStatisticsAction {
    return {
        type: CHANGE_PAGE,
        page: STATISTICS_PAGE
    }
}
