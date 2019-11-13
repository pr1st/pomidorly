import {
    GET_TIMER_CONFIG,
    GetTimerConfigAction,
    NEXT_SECOND,
    NextSecondAction, PAUSE_TIMER, PauseTimerAction, SKIP_TIMER, SkipTimerAction, START_TIMER,
    StartTimerAction, STOP_TIMER, StopTimerAction,
    TimerConfigState
} from "../types/timer";
import {Dispatch} from "react";
import {AppState} from "../types";


function getTimerConfig(config: TimerConfigState) : GetTimerConfigAction {
    return {
        type: GET_TIMER_CONFIG,
        config
    }
}

export function nextSecond() : NextSecondAction {
    return {
        type: NEXT_SECOND
    }
}

export function startTimer() : StartTimerAction {
    return {
        type: START_TIMER
    }
}

export function pauseTimer() : PauseTimerAction {
    return {
        type: PAUSE_TIMER
    }
}

export function stopTimer() : StopTimerAction {
    return {
        type: STOP_TIMER
    }
}

export function skipTimer() : SkipTimerAction {
    return {
        type: SKIP_TIMER
    }
}

export function fetchTimerConfig() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {

    }
}

export function setTimerConfig(config: TimerConfigState) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {

    }
}