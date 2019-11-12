import {TimerActions, TimerState} from "./timer";
import {CurrentPageActions, CurrentPageState} from "./currentPage";

// actions
export type AppActions = TimerActions | CurrentPageActions

// state
export type AppState = {
    timer: TimerState,
    currentPage: CurrentPageState
}

