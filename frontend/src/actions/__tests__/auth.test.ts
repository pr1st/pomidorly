import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {ACCEPT, APPLICATION_JSON, CONTENT_TYPE, request, TOKEN} from "../request";
import {logOut, refreshToken, setErrorMessage, signUp} from "../auth";
import {LOG_OUT, REFRESH_TOKEN, SET_ERROR_MESSAGE} from "../../types/auth";
import {CHANGE_PAGE, SIGN_IN} from "../../types/currentPage";


jest.mock("../request");

describe("Test auth actions", () => {
    let configureStore: any;
    let mockStore: any;

    beforeEach(() => {
        configureStore = configureMockStore([thunk]);
    });

    it("Set error message", async () => {
        const testString = "Error Message";
        mockStore = configureStore({});

        mockStore.dispatch(setErrorMessage(testString));

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({type: SET_ERROR_MESSAGE, message: testString});
    });

    describe("Async actions", () => {
        afterEach(() => {
            //@ts-ignore
            request.mockClear();
        });

        it("Log out", async () => {
            mockStore = configureStore({});
            return mockStore.dispatch(logOut())
                .then(() => {
                    const actions = mockStore.getActions();
                    expect(actions.length).toBe(1);
                    expect(actions[0]).toEqual({type: LOG_OUT});
                });
        });

        it("Refresh token", async () => {
            const responseToken = {
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

            const initToken = "aaa";
            mockStore = configureStore({
                auth: {
                    token: {
                        token: initToken
                    }
                }
            });

            return mockStore.dispatch(refreshToken())
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
                    expect(actions[0]).toEqual({
                        type: REFRESH_TOKEN,
                        token: responseToken
                    })
                });
        });

        it("Sign up", async () => {
            // @ts-ignore
            request.mockResolvedValue({
                status: 204
            });
            let myPwd = "qwerewt";
            const requestSignUp = {
                login: "userName",
                password: myPwd
            };

            mockStore = configureStore({});

            return mockStore.dispatch(signUp(requestSignUp.login, requestSignUp.password))
                .then(() => {
                    // @ts-ignore
                    const mockedRequest = request.mock.calls[0];
                    expect(mockedRequest[1]).toEqual("POST");
                    expect(mockedRequest[2]).toEqual("auth/signup");
                    expect(mockedRequest[3]).toEqual({
                        [CONTENT_TYPE]: APPLICATION_JSON
                    });
                    expect(mockedRequest[4]).toEqual(requestSignUp);


                    const actions = mockStore.getActions();
                    expect(actions.length).toBe(1);
                    expect(actions[0]).toEqual({
                        type: CHANGE_PAGE,
                        page: SIGN_IN
                    })
                });
        });
    })
});