import {TimerActions, TimerState} from "./timer";
import {CurrentPageActions, CurrentPageState} from "./currentPage";
import {AuthActions, AuthState} from "./auth";

// actions
export type AppActions =
    TimerActions |
    CurrentPageActions |
    AuthActions

// state
export type AppState = {
    timer: TimerState,
    currentPage: CurrentPageState,
    auth: AuthState
}

