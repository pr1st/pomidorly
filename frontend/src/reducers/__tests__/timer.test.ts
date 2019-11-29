import {
    GET_TIMER_CONFIG,
    GetTimerConfigAction,
    PAUSE_TIMER,
    SKIP_TIMER,
    START_TIMER,
    STOP_TIMER,
    TimerState
} from "../../types/timer";
import {timeReducer} from "../timer";


describe("test timer reducers", () => {
    it("ads", () => {

    });
    // let state: TimerState
    // beforeEach(
    //     () => {
    //         state = {
    //             currentState: {
    //                 currentPomidor: 1,
    //                 isBreak: false,
    //                 isActive: false,
    //                 time: 123
    //             },
    //             config: {
    //                 shortBreakDuration: 250,
    //                 pomidorDuration: 500,
    //                 numberOfPomidorsBeforeLongBreak: 3,
    //                 longBreakDuration: 300,
    //                 alarmWhenZero: false
    //             }
    //         }
    //     }
    // )
    //
    // it("get action", () => {
    //     const testAction: GetTimerConfigAction = {
    //         type: GET_TIMER_CONFIG,
    //         config: {
    //             alarmWhenZero: false,
    //             longBreakDuration: 1,
    //             numberOfPomidorsBeforeLongBreak: 4,
    //             pomidorDuration: 3,
    //             shortBreakDuration: 5
    //         }
    //     };
    //     const newState = timeReducer(state, testAction)
    //     expect(newState).toEqual({
    //         ...state,
    //         config: testAction.config
    //     })
    // });
    //
    // describe("next second test", () => {
    //         let nextSecond: NextSecondAction
    //         beforeEach(() => {
    //             nextSecond = {
    //                 type: NEXT_SECOND
    //             }
    //             state = {
    //                 ...state,
    //                 currentState: {
    //                     time: 123,
    //                     isActive: true,
    //                     isBreak: false,
    //                     currentPomidor: 1
    //                 }
    //             }
    //         });
    //
    //         it("is not active", () => {
    //             state.currentState.isActive = false
    //             const newState = timeReducer(state, nextSecond)
    //             expect(newState).toEqual(state)
    //         });
    //
    //         it("active", () => {
    //             const newState = timeReducer(state, nextSecond)
    //             expect(newState).toEqual({
    //                 ...state,
    //                 currentState: {
    //                     ...state.currentState,
    //                     time: state.currentState.time - 1
    //                 }
    //             })
    //         });
    //
    //         it("to short break", () => {
    //             state.currentState.time = 1
    //             const newState = timeReducer(state, nextSecond)
    //             expect(newState).toEqual({
    //                 ...state,
    //                 currentState: {
    //                     ...state.currentState,
    //                     time: state.config.shortBreakDuration * 60,
    //                     isActive: true,
    //                     isBreak: true,
    //                     currentPomidor: state.currentState.currentPomidor+1
    //                 }
    //             })
    //         });
    //
    //         it("to long break", () => {
    //             state.currentState.time = 1
    //             state.currentState.currentPomidor = state.config.numberOfPomidorsBeforeLongBreak - 1
    //             const newState = timeReducer(state, nextSecond)
    //             expect(newState).toEqual({
    //                 ...state,
    //                 currentState: {
    //                     ...state.currentState,
    //                     time: state.config.longBreakDuration * 60,
    //                     isActive: true,
    //                     isBreak: true,
    //                     currentPomidor: 0
    //                 }
    //             })
    //         });
    //
    //         it("to pomidor", () => {
    //             state.currentState.time = 1
    //             state.currentState.isBreak = true
    //             const newState = timeReducer(state, nextSecond)
    //             expect(newState).toEqual({
    //                 ...state,
    //                 currentState: {
    //                     ...state.currentState,
    //                     time: state.config.pomidorDuration * 60,
    //                     isActive: false,
    //                     isBreak: false
    //                 }
    //             })
    //         });
    //     }
    // )
    //
    // it("start timer", () => {
    //     const newState = timeReducer(state, {
    //         type: START_TIMER
    //     })
    //     expect(newState).toEqual({
    //         ...state,
    //         currentState: {
    //             ...state.currentState,
    //             isActive: true
    //         }
    //     })
    // });
    //
    // it("pause timer", () => {
    //     const newState = timeReducer(state, {
    //         type: PAUSE_TIMER
    //     })
    //     expect(newState).toEqual({
    //         ...state,
    //         currentState: {
    //             ...state.currentState,
    //             isActive: false
    //         }
    //     })
    // });
    //
    // it("stop timer", () => {
    //     const newState = timeReducer(state, {
    //         type: STOP_TIMER
    //     })
    //     expect(newState).toEqual({
    //         ...state,
    //         currentState: {
    //             ...state.currentState,
    //             isActive: false,
    //             time: state.config.pomidorDuration * 60
    //         }
    //     })
    // });
    //
    // it("skip timer", () => {
    //     const newState = timeReducer(state, {
    //         type: SKIP_TIMER
    //     })
    //     expect(newState).toEqual({
    //         ...state,
    //         currentState: {
    //             ...state.currentState,
    //             isActive: true,
    //             isBreak: true,
    //             currentPomidor: 2,
    //             time: state.config.shortBreakDuration * 60
    //         }
    //     })
    // });
});