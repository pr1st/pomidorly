import {fetchTimerConfig, setTimerConfig, pauseTimer, skipTimer, startTimer, stopTimer, putTimerConfig} from "../timer";
import {
    PAUSE_TIMER, SET_TIMER_CONFIG,
    SKIP_TIMER,
    START_TIMER,
    STOP_TIMER,
    TimerConfigState
} from "../../types/timer";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {ACCEPT, APPLICATION_JSON, CONTENT_TYPE, request, TOKEN} from "../request";

jest.mock("../request");

describe("Test timer actions", () => {
    let mockStore: any;
    const initState = {
        auth: {
            token: {
                token: "customToken"
            }
        }
    };

    beforeEach(() => {
        mockStore = configureMockStore([thunk])(initState);
    });

    it("Set timer config", () => {
        const testConfig: TimerConfigState = {
            alarmWhenZero: false,
            longBreakDuration: 3,
            numberOfPomidorsBeforeLongBreak: 4,
            pomidorDuration: 2,
            shortBreakDuration: 4
        };

        mockStore.dispatch(setTimerConfig(testConfig));

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({type: SET_TIMER_CONFIG, config: testConfig});
    });

    it("Start timer", () => {
        mockStore.dispatch(startTimer());

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({type: START_TIMER});
    });

    it("Pause timer", () => {
        mockStore.dispatch(pauseTimer());

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({type: PAUSE_TIMER});
    });

    it("Stop timer", () => {
        mockStore.dispatch(stopTimer());

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({type: STOP_TIMER});
    });

    it("Skip timer", () => {
        mockStore.dispatch(skipTimer());
        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({type: SKIP_TIMER});
    });

    describe("async actions", () => {
        afterEach(() => {
            //@ts-ignore
            request.mockClear();
        });

        it("fetch config", async () => {
            const responseConfig: TimerConfigState = {
                alarmWhenZero: false,
                longBreakDuration: 3,
                numberOfPomidorsBeforeLongBreak: 4,
                pomidorDuration: 2,
                shortBreakDuration: 4
            };
            const responseHeaders = {
                [CONTENT_TYPE]: APPLICATION_JSON
            };
            // @ts-ignore
            request.mockResolvedValue({
                data: responseConfig,
                headers: responseHeaders
            });

            return mockStore.dispatch(fetchTimerConfig())
                .then(() => {
                    // @ts-ignore
                    const mockedRequest = request.mock.calls[0];
                    expect(mockedRequest[1]).toEqual("GET");
                    expect(mockedRequest[2]).toEqual("timer");
                    expect(mockedRequest[3]).toEqual({
                        [ACCEPT]: APPLICATION_JSON,
                        [TOKEN]: initState.auth.token.token,
                    });


                    const actions = mockStore.getActions();
                    expect(actions.length).toBe(1);
                    expect(actions[0]).toEqual(setTimerConfig(responseConfig))
                });
        });

        it("put config", async () => {
            const requestConfig: TimerConfigState = {
                alarmWhenZero: false,
                longBreakDuration: 3,
                numberOfPomidorsBeforeLongBreak: 4,
                pomidorDuration: 2,
                shortBreakDuration: 4
            };
            const responseStatus = 204;
            // @ts-ignore
            request.mockResolvedValue({
                status: responseStatus
            });

            return mockStore.dispatch(putTimerConfig(requestConfig))
                .then(() => {
                    // @ts-ignore
                    const mockedRequest = request.mock.calls[0];
                    expect(mockedRequest[1]).toEqual("PUT");
                    expect(mockedRequest[2]).toEqual("timer");
                    expect(mockedRequest[3]).toEqual({
                        [CONTENT_TYPE]: APPLICATION_JSON,
                        [TOKEN]: initState.auth.token.token,
                    });

                    expect(mockStore.getActions().length).toBe(0);
                });
        });
    });

    it("fetch timer config no content type header", async () => {
        // @ts-ignore
        request.mockResolvedValue({headers: {}});
        return mockStore.dispatch(fetchTimerConfig())
        .catch(() => {
            expect(mockStore.getActions().length).toBe(0);
        })
    });

    it("put timer config wrong response", async () => {
        // @ts-ignore
        request.mockResolvedValue({status: 202});
        return mockStore.dispatch(putTimerConfig({
            alarmWhenZero:false,
            longBreakDuration:2,
            numberOfPomidorsBeforeLongBreak:3,
            pomidorDuration:5,
            shortBreakDuration:6
        }))
        .catch(() => {
            expect(mockStore.getActions().length).toBe(0);
        })
    });
});