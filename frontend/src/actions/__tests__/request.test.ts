import axios from "axios";
import {checkError, lastCatchResponseError, request, unAuthorisedAction} from "../request";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {endFetching, startFetching} from "../fetch";
import {serverApi, serverPort, serverProtocol, serverURL} from "../../config";
import {changePageToSignIn} from "../currentPage";
import {setErrorMessage} from "../auth";
import { async } from "q";

jest.mock("axios");

describe("Test requests to server", () => {
    let mockStore: any;

    beforeEach(() => {
        mockStore = configureMockStore([thunk])({});
    });

    afterEach(() => {
        //@ts-ignore
        axios.mockClear();
    });

    it("request", async () => {
        const requestData = {
            dispatch: mockStore.dispatch,
            method: "GET",
            resource: "customResource",
            headers: {
                Header1: "Header name 1",
                Header2: "Header name 2"
            },
            body: {
                a: {
                    b: "bbb",
                    c: 123
                },
                d: false
            }
        };

        const responseData = {
            a: "b",
            b: 120,
            c: {
                d: true
            }
        };

        // @ts-ignore
        axios.mockResolvedValue(responseData);


        return request(
            requestData.dispatch,
            // @ts-ignore
            requestData.method,
            requestData.resource,
            requestData.headers,
            requestData.body
        )
            // @ts-ignore
            .then(ret => {
                expect(ret).toEqual(responseData);

                // @ts-ignore
                const mockedRequest = axios.mock.calls[0];
                expect(mockedRequest[0]).toEqual({
                    method: requestData.method,
                    baseURL: `${serverProtocol}://${serverURL}:${serverPort}${serverApi}${requestData.resource}`,
                    headers: requestData.headers,
                    data: requestData.body
                });


                const actions = mockStore.getActions();
                expect(actions.length).toBe(2);
                expect(actions[0]).toEqual(startFetching());
                expect(actions[1]).toEqual(endFetching());
            });
    });

    it("unauthorised situation", () => {
        unAuthorisedAction(mockStore.dispatch)({
            response: {
                status: 401
            }
        });

        const actions = mockStore.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0]).toEqual(changePageToSignIn());
        expect(actions[1]).toEqual(setErrorMessage("Token was not refreshed"));
    });

    it("called unauthorised action without this situation", () => {
        unAuthorisedAction(mockStore.dispatch)({
            response: {
                status: 404
            }
        });
        expect(mockStore.getActions().length).toBe(0);
    });

    it("something bad happened", () => {
        lastCatchResponseError(mockStore.dispatch)({
            response: "bad"
        });

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual(setErrorMessage("Something bad happened"));
    });

    it("last catch without response", () => {
        lastCatchResponseError(mockStore.dispatch)({});

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual(setErrorMessage("Something bad happened"));
    });

    it("checkError", () => {
        checkError(mockStore.dispatch, 431, "msg")({
            response: {
                status: 431
            }
        });

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual(setErrorMessage("msg"));
    });

    it("checkError rethrow error if not suited", async () => {
        const error = {
            response: {
                status: 434
            }
        }
        const f = async () => checkError(mockStore.dispatch, 431, "msg")(error);
        f().catch(e => {
            expect(mockStore.getActions().length).toBe(0);
            expect(e).toBe(error)
        })
    });
});