import {TimerActions, TimerState} from "./timer";
import {CurrentPageActions, CurrentPageState} from "./currentPage";
import {AuthActions, AuthState} from "./auth";
import {FetchActions, FetchState} from "./fetch";
import {CurrentTasksActions, CurrentTasksState} from "./currentTasks";

// actions
export type AppActions =
    TimerActions |
    CurrentPageActions |
    AuthActions |
    FetchActions |
    CurrentTasksActions

// state
export type AppState = {
    timer: TimerState,
    currentPage: CurrentPageState,
    auth: AuthState,
    fetching: FetchState,
    currentTasks: CurrentTasksState
}

