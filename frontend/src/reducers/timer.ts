import {
    GET_TIMER_CONFIG,
    NEXT_SECOND,
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
        time: 25 * 60,
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
                    time: action.config.pomidorDuration * 60,
                    isActive: false,
                    currentPomidor: 0,
                    isBreak: false
                }
            };
        case NEXT_SECOND:
            return nextSecond(state);
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

function nextSecond(state: TimerState): TimerState {
    if (!state.currentState.isActive)
        return state;
    if (state.currentState.time - 1 > 0) {
        const currentState = {...state.currentState};
        const config = {...state.config};
        currentState.time--;
        return {
            config,
            currentState
        }
    }
    return skipTimer(state)
}

function startTimer(state: TimerState): TimerState {
    return {
        config: {
            ...state.config
        },
        currentState: {
            ...state.currentState,
            isActive: true
        }
    }
}

function pauseTimer(state: TimerState): TimerState {
    return {
        config: {
            ...state.config
        },
        currentState: {
            ...state.currentState,
            isActive: false
        }
    }
}

function stopTimer(state: TimerState): TimerState {
    let newTime
    const {isBreak, currentPomidor} = state.currentState;
    if (isBreak) {
        const {longBreakDuration, shortBreakDuration} = state.config;
        newTime = 60 * (currentPomidor === 0 ? longBreakDuration : shortBreakDuration)
    } else {
        newTime = state.config.pomidorDuration * 60
    }
    return {
        config: {
            ...state.config
        },
        currentState: {
            ...state.currentState,
            isActive: false,
            time: newTime
        }
    }
}

function skipTimer(state: TimerState): TimerState {
    const currentState = {...state.currentState};
    const config = {...state.config};
    if (currentState.isBreak) {
        currentState.isBreak = false;
        currentState.time = config.pomidorDuration * 60;
        currentState.isActive = false
    } else {
        currentState.isBreak = true;
        currentState.isActive = true;
        if (currentState.currentPomidor + 1 === config.numberOfPomidorsBeforeLongBreak) {
            currentState.currentPomidor = 0;
            currentState.time = config.longBreakDuration * 60
        } else {
            currentState.currentPomidor++;
            currentState.time = config.shortBreakDuration * 60
        }
    }
    return {
        currentState,
        config
    }
}