import {
    PAUSE_TIMER, PauseTimerAction, SET_TIMER_CONFIG, SetTimerConfigAction, SKIP_TIMER, SkipTimerAction, START_TIMER,
    StartTimerAction, STOP_TIMER, StopTimerAction,
    TimerConfigState
} from "../types/timer";
import {Dispatch} from "react";
import {AppState} from "../types";
import {
    ACCEPT,
    APPLICATION_JSON,
    CONTENT_TYPE, lastCatchResponseError,
    request,
    TOKEN,
    unAuthorisedAction
} from "./request";


export function setTimerConfig(config: TimerConfigState): SetTimerConfigAction {
    return {
        type: SET_TIMER_CONFIG,
        config
    }
}

export function startTimer(): StartTimerAction {
    return {
        type: START_TIMER
    }
}

export function pauseTimer(): PauseTimerAction {
    return {
        type: PAUSE_TIMER
    }
}

export function stopTimer(): StopTimerAction {
    return {
        type: STOP_TIMER
    }
}

export function skipTimer(): SkipTimerAction {
    return {
        type: SKIP_TIMER
    }
}

export function fetchTimerConfig() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        return request(
            dispatch,
            "GET",
            "timer",
            {
                [ACCEPT]: APPLICATION_JSON,
                [TOKEN]: getState().auth.token.token,
            }
        )
            .then(res => {
                if (res.headers[CONTENT_TYPE] === APPLICATION_JSON) {
                    return res.data
                } else {
                    return Promise.reject("No Content-type header");
                }
            })
            .then(res => {
                const config = (res as TimerConfigState);
                dispatch(setTimerConfig(config));
            })
            .catch(unAuthorisedAction(dispatch))
            .catch(lastCatchResponseError(dispatch))
    }
}

export function putTimerConfig(config: TimerConfigState) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        return request(
            dispatch,
            "PUT",
            "timer",
            {
                [CONTENT_TYPE]: APPLICATION_JSON,
                [TOKEN]: getState().auth.token.token
            },
            config
        )
            .then(res => {
                if (res.status === 204) {
                    console.log("Saved data to server");
                    dispatch(fetchTimerConfig())
                } else {
                    return Promise.reject("No 204 response");
                }
            })
            .catch(unAuthorisedAction(dispatch))
            .catch(lastCatchResponseError(dispatch))
    }
}