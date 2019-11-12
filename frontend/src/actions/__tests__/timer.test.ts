import {getTimerConfig, nextSecond, pauseTimer, skipTimer, startTimer, stopTimer} from "../timer";
import {
    GET_TIMER_CONFIG,
    NEXT_SECOND,
    PAUSE_TIMER,
    SKIP_TIMER,
    START_TIMER,
    STOP_TIMER,
    TimerConfigState
} from "../../types/timer";


describe("Test timer actions", () => {
    it("get config", () => {
        const test : TimerConfigState = {
            alarmWhenZero: false,
            longBreakDuration: 3,
            numberOfPomidorsBeforeLongBreak: 4,
            pomidorDuration: 2,
            shortBreakDuration: 4
        }
        const action = getTimerConfig(test)
        expect(action).toEqual({ type: GET_TIMER_CONFIG, config: test })
    });

    it("next second", () => {
        const action = nextSecond()
        expect(action).toEqual({type: NEXT_SECOND})
    });

    it("start timer", () => {
        const action = startTimer()
        expect(action).toEqual({type: START_TIMER})
    });

    it("pause timer", () => {
        const action = pauseTimer()
        expect(action).toEqual({type: PAUSE_TIMER})
    });

    it("stop timer", () => {
        const action = stopTimer()
        expect(action).toEqual({type: STOP_TIMER})
    });
    it("skip timer", () => {
        const action = skipTimer()
        expect(action).toEqual({type: SKIP_TIMER})
    });
});