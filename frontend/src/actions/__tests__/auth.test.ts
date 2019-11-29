import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {ACCEPT, APPLICATION_JSON, CONTENT_TYPE, request, TOKEN} from "../request";
import {logOut, refreshToken, setErrorMessage} from "../auth";
import {LOG_OUT, REFRESH_TOKEN, SET_ERROR_MESSAGE} from "../../types/auth";
import {TimerConfigState} from "../../types/timer";
import {fetchTimerConfig, setTimerConfig} from "../timer";


jest.mock("../request");

describe("Test auth actions", () => {
    let mockStore: any;

    beforeEach(() => {
        mockStore = configureMockStore([thunk]);
    });

    it("Set error message", async () => {
        const testString = "Error Message";

        mockStore.dispatch(setErrorMessage(testString));

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({ type: SET_ERROR_MESSAGE, message: testString});
    });

    describe("Async actions", () => {
        afterEach(() => {
            //@ts-ignore
            request.mockClear();
        });

        it("Log out", async () => {
            return mockStore({}).dispatch(logOut())
                .then(() => {
                    const actions = mockStore.getActions();
                    expect(actions.length).toBe(1);
                    expect(actions[0]).toEqual({ type: LOG_OUT});
                });
        });

        it("Refresh token", async () => {
            const responseToken  = {
                    token: "asfjakfajfjfkalf",
                    expiresIn: 3600
            };
            const responseHeaders = {
                [CONTENT_TYPE]: APPLICATION_JSON
            };
            // @ts-ignore
            request.mockResolvedValue({
                data: responseToken,
                headers: responseHeaders
            });
            const initToken  =  "aaa";

            return mockStore({
                auth: {
                    token: {
                        token: initToken
                    }
                }
            })
                .dispatch(refreshToken())
                    .then(() => {
                        // @ts-ignore
                        const mockedRequest = request.mock.calls[0];
                        expect(mockedRequest[1]).toEqual("POST");
                        expect(mockedRequest[2]).toEqual("auth/refresh");
                        expect(mockedRequest[3]).toEqual({
                            [ACCEPT]: APPLICATION_JSON,
                            [TOKEN]: initToken,
                        });


                        const actions = mockStore.getActions();
                        expect(actions.length).toBe(1);
                        expect(actions[0]).toEqual({ type: REFRESH_TOKEN})
                    })
        });

        it("Sign up", async () => {

        });

        it("Sign in", async () => {

        });
    })
});