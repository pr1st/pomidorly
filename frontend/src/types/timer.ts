// actions
export const GET_TIMER_CONFIG = "GET_TIMER_CONFIG";
export const NEXT_SECOND = "NEXT_SECOND";
export const START_TIMER = "START_TIMER";
export const PAUSE_TIMER = "PAUSE_TIMER";
export const STOP_TIMER = "STOP_TIMER";
export const SKIP_TIMER = "SKIP_TIMER";


export interface GetTimerConfigAction {
    type: typeof GET_TIMER_CONFIG
    config: TimerConfigState
}

export interface NextSecondAction {
    type: typeof NEXT_SECOND
}

export interface StartTimerAction {
    type: typeof START_TIMER
}

export interface PauseTimerAction {
    type: typeof PAUSE_TIMER
}

export interface StopTimerAction {
    type: typeof STOP_TIMER
}

export interface SkipTimerAction {
    type: typeof SKIP_TIMER
}

export type TimerActions =
    GetTimerConfigAction
    | NextSecondAction
    | StartTimerAction
    | PauseTimerAction
    | StopTimerAction
    | SkipTimerAction


// state
export type TimerConfigState = {
    pomidorDuration: number,
    shortBreakDuration: number,
    longBreakDuration: number,
    numberOfPomidorsBeforeLongBreak: number,
    alarmWhenZero: boolean
}

export type CurrentTimerState = {
    time: number,
    isActive: boolean,
    currentPomidor: number,
    isBreak: boolean
}

export type TimerState = {
    config: TimerConfigState,
    currentState: CurrentTimerState
}