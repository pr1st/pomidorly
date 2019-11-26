import {
    GET_TIMER_CONFIG,
    PAUSE_TIMER, SKIP_TIMER,
    START_TIMER,
    STOP_TIMER,
    TimerActions,
    TimerState
} from "../types/timer";


const initialState: TimerState = {
    config: {
        pomidorDuration: 20,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        numberOfPomidorsBeforeLongBreak: 4,
        alarmWhenZero: false
    },
    currentState: {
        startTime: 0,
        timeRemaining: 25 * 60 * 60 + 500,
        isActive: false,
        currentPomidor: 0,
        isBreak: false
    }
};

export function timeReducer(
    state = initialState,
    action: TimerActions
): TimerState {
    switch (action.type) {
        case GET_TIMER_CONFIG:
            return {
                config: action.config,
                currentState: {
                    startTime: 0,
                    timeRemaining: action.config.pomidorDuration * 60 * 1000 + 500,
                    isActive: false,
                    currentPomidor: 0,
                    isBreak: false
                }
            };
        case START_TIMER:
            return startTimer(state);
        case PAUSE_TIMER:
            return pauseTimer(state);
        case STOP_TIMER:
            return stopTimer(state);
        case SKIP_TIMER:
            return skipTimer(state);
        default:
            return state
    }
}

function startTimer(state: TimerState): TimerState {
    return {
        config: {
            ...state.config
        },
        currentState: {
            ...state.currentState,
            isActive: true,
            startTime: Date.now()
        }
    }
}

function pauseTimer(state: TimerState): TimerState {
    let newTimeRemain = state.currentState.timeRemaining - (Date.now() - state.currentState.startTime);
    if (newTimeRemain < 0) {
        newTimeRemain = 0
    }
    if (!state.currentState.isActive)
        return state
    return {
        config: {
            ...state.config
        },
        currentState: {
            ...state.currentState,
            isActive: false,
            timeRemaining: newTimeRemain
        }
    }
}

function stopTimer(state: TimerState): TimerState {
    let newTime
    const {isBreak, currentPomidor} = state.currentState;
    if (isBreak) {
        const {longBreakDuration, shortBreakDuration} = state.config;
        newTime = 1000 * 60 * (currentPomidor === 0 ? longBreakDuration : shortBreakDuration) + 500
    } else {
        newTime = state.config.pomidorDuration * 60 * 1000 + 500
    }
    return {
        config: {
            ...state.config
        },
        currentState: {
            ...state.currentState,
            isActive: false,
            timeRemaining: newTime
        }
    }
}

function skipTimer(state: TimerState): TimerState {
    const currentState = {...state.currentState};
    const config = {...state.config};
    if (currentState.isBreak) {
        currentState.isBreak = false;
        currentState.timeRemaining = config.pomidorDuration * 60 * 1000 + 500;
        currentState.isActive = false
    } else {
        currentState.isBreak = true;
        currentState.isActive = true;
        currentState.startTime = Date.now();
        if (currentState.currentPomidor + 1 === config.numberOfPomidorsBeforeLongBreak) {
            currentState.currentPomidor = 0;
            currentState.timeRemaining = config.longBreakDuration * 60 * 1000 + 500
        } else {
            currentState.currentPomidor++;
            currentState.timeRemaining = config.shortBreakDuration * 60 * 1000 + 500
        }
    }
    return {
        currentState,
        config
    }
}