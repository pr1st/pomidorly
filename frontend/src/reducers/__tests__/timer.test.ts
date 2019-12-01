import {
    PAUSE_TIMER, PauseTimerAction,
    SET_TIMER_CONFIG, SetTimerConfigAction, SKIP_TIMER, SkipTimerAction,
    START_TIMER, StartTimerAction, STOP_TIMER, StopTimerAction,
    TimerState
} from "../../types/timer";
import {timeReducer} from "../timer";


describe("Test timer reducers", () => {
    let initState: TimerState;
    beforeEach(() => {
        initState = {
            currentState: {
                isBreak: false,
                isActive: false,
                startTime: 123,
                timeRemaining: 10,
                currentPomidor: 2
            },
            config: {
                alarmWhenZero: false,
                longBreakDuration: 10,
                numberOfPomidorsBeforeLongBreak: 5,
                pomidorDuration: 5,
                shortBreakDuration: 2
            }
        };
    });

    it("Test set timer config action", () => {
        const action: SetTimerConfigAction = {
            type: SET_TIMER_CONFIG,
            config: {
                shortBreakDuration: 2,
                pomidorDuration: 3,
                numberOfPomidorsBeforeLongBreak: 5,
                longBreakDuration: 6,
                alarmWhenZero: true
            }
        };
        const newState = timeReducer(initState, action);
        expect(newState).toEqual({
            config: action.config,
            currentState: {
                isBreak: false,
                isActive: false,
                startTime: 0,
                timeRemaining: action.config.pomidorDuration * 60 * 1000 + 500,
                currentPomidor: 0
            }
        });
    });

    it("Test start timer action", () => {
        const action: StartTimerAction = {
            type: START_TIMER
        };
        const newState = timeReducer(initState, action);
        expect(newState).toEqual({
            ...initState,
            currentState: {
                ...initState.currentState,
                isActive: true,
                startTime: newState.currentState.startTime // check later
            }
        });

        // in range of 5 seconds
        expect(newState.currentState.startTime).toBeLessThanOrEqual(Date.now());
        expect(newState.currentState.startTime).toBeGreaterThanOrEqual(Date.now() - 5000);
    });

    it("Test pause timer action", () => {
        const action: PauseTimerAction = {
            type: PAUSE_TIMER
        };

        initState.currentState.isActive = true;
        initState.currentState.timeRemaining = 150 * 1000; // 150 sec
        initState.currentState.startTime = Date.now() - 1000 * 10; // 10 sec
        const expectedTimeRemaining = 140 * 1000; // 140 sec

        const newState = timeReducer(initState, action);

        expect(newState).toEqual({
            ...initState,
            currentState: {
                ...initState.currentState,
                isActive: false,
                timeRemaining: newState.currentState.timeRemaining // check later
            }
        });

        // in range of 5 seconds
        expect(newState.currentState.timeRemaining).toBeLessThanOrEqual(expectedTimeRemaining + 2500);
        expect(newState.currentState.timeRemaining).toBeGreaterThanOrEqual(expectedTimeRemaining - 2500);
    });

    it("Test stop timer action", () => {
        const action: StopTimerAction = {
            type: STOP_TIMER
        };

        const newState = timeReducer(initState, action);
        expect(newState).toEqual({
            ...initState,
            currentState: {
                ...initState.currentState,
                isActive: false,
                timeRemaining: initState.config.pomidorDuration * 1000 * 60 + 500
            }
        });
    });

    it("Test skip timer action", () => {
        const action: SkipTimerAction = {
            type: SKIP_TIMER
        };
        const newState = timeReducer(initState, action);
        expect(newState).toEqual({
            ...initState,
            currentState: {
                ...initState.currentState,
                isActive: true,
                isBreak: true,
                currentPomidor: initState.currentState.currentPomidor + 1,
                timeRemaining: initState.config.shortBreakDuration * 1000 * 60 + 500,
                startTime: newState.currentState.startTime // check later
            }
        });

        // in range of 5 seconds
        expect(newState.currentState.startTime).toBeLessThanOrEqual(Date.now());
        expect(newState.currentState.startTime).toBeGreaterThanOrEqual(Date.now() - 5000);
    });
});