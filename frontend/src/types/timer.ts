// actions
export const SET_TIMER_CONFIG = "SET_TIMER_CONFIG";
export const START_TIMER = "START_TIMER";
export const PAUSE_TIMER = "PAUSE_TIMER";
export const STOP_TIMER = "STOP_TIMER";
export const SKIP_TIMER = "SKIP_TIMER";


export interface SetTimerConfigAction {
    type: typeof SET_TIMER_CONFIG
    config: TimerConfigState
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
    SetTimerConfigAction
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
    timeRemaining: number,
    startTime: number,
    isActive: boolean,
    currentPomidor: number,
    isBreak: boolean
}

export type TimerState = {
    config: TimerConfigState,
    currentState: CurrentTimerState
}