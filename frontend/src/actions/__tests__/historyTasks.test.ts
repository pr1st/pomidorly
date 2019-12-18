import {ACCEPT, APPLICATION_JSON, CONTENT_TYPE, request, TOKEN} from "../request";
import {createHistoryTask, deleteHistoryTask, fetchHistoryTasks} from "../historyTasks";
import {GET_HISTORY_TASKS} from "../../types/historyTasks";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

jest.mock("../request");

describe("Test history task actions", () => {
    let initState: any;
    let dispatch: any;
    let getState: any;
    let configureStore: any;
    let mockStore: any;

    beforeEach(() => {
        configureStore = configureMockStore([thunk]);
        initState = {
            currentTasks: [
                {
                    id: 1,
                    inQueue: 1,
                    tag: "tag",
                    description: "desc",
                    numberOfPomidors: 0
                }, {
                    id: 2,
                    inQueue: 2,
                }
            ],
            auth: {
                token: {
                    token: "customToken"
                }
            }
        };

        dispatch = jest.fn();
        getState = jest.fn(() => (initState));
    });

    afterEach(() => {
        //@ts-ignore
        request.mockClear();
    });

    it("fetch history tasks", async () => {
        const responseTasks = [
            {
                id: 1
            }, {
                id: 2
            },
        ];
        // @ts-ignore
        request.mockResolvedValue({
            status: 200,
            headers: {
                [CONTENT_TYPE]: APPLICATION_JSON
            },
            data: responseTasks
        });

        // @ts-ignore
        await fetchHistoryTasks()(dispatch, getState);

        // @ts-ignore
        const mockedRequest = request.mock.calls[0];
        expect(mockedRequest.length).toEqual(4);
        expect(mockedRequest[1]).toEqual("GET");
        expect(mockedRequest[2]).toEqual("history/tasks");
        expect(mockedRequest[3]).toEqual({
            [ACCEPT]: APPLICATION_JSON,
            [TOKEN]: initState.auth.token.token
        });

        // @ts-ignore
        const mocked = dispatch.mock.calls[0];
        expect(mocked.length).toEqual(1);
        expect(mocked[0]).toEqual({type: GET_HISTORY_TASKS, tasks: responseTasks});
    });

    it("create history task", async () => {
        const requestTask = {
            tag: "dddd",
            description: "asd",
            timeFinished: 1234
        };
        // @ts-ignore
        request.mockResolvedValue({
            status: 201
        });

        // @ts-ignore
        await createHistoryTask(requestTask.tag, requestTask.description, requestTask.timeFinished)(dispatch, getState);

        // @ts-ignore
        const mockedRequest = request.mock.calls[0];
        expect(mockedRequest.length).toEqual(5);
        expect(mockedRequest[1]).toEqual("POST");
        expect(mockedRequest[2]).toEqual("history/tasks");
        expect(mockedRequest[3]).toEqual({
            [CONTENT_TYPE]: APPLICATION_JSON,
            [TOKEN]: initState.auth.token.token
        });
        expect(mockedRequest[4]).toEqual(requestTask);

        // @ts-ignore
        const mocked = dispatch.mock.calls[0];
        expect(mocked.length).toEqual(1);
    });

    it("delete history task", async () => {
        const requestTaskId = 2;
        // @ts-ignore
        request.mockResolvedValue({
            status: 204
        });

        // @ts-ignore
        await deleteHistoryTask(requestTaskId)(dispatch, getState);

        // @ts-ignore
        const mockedRequest = request.mock.calls[0];
        expect(mockedRequest.length).toEqual(4);
        expect(mockedRequest[1]).toEqual("DELETE");
        expect(mockedRequest[2]).toEqual(`history/tasks/${requestTaskId}`);
        expect(mockedRequest[3]).toEqual({
            [TOKEN]: initState.auth.token.token
        });

        // @ts-ignore
        const mocked = dispatch.mock.calls[0];
        expect(mocked.length).toEqual(1);
    });

    it("fetch history tasks no content type header", async () => {
        mockStore = configureStore(initState);
        // @ts-ignore
        request.mockResolvedValue({headers: {}});
        return mockStore.dispatch(fetchHistoryTasks())
        .catch(() => {
            expect(mockStore.getActions().length).toBe(0);
        })
    });

    it("create history task wrong response", async () => {
        mockStore = configureStore(initState);
        // @ts-ignore
        request.mockResolvedValue({status: 202});
        return mockStore.dispatch(createHistoryTask("t", "d", 123))
        .catch(() => {
            expect(mockStore.getActions().length).toBe(0);
        })
    });

    it("delete history task wrong response", async () => {
        mockStore = configureStore(initState);
        // @ts-ignore
        request.mockResolvedValue({status: 202});
        return mockStore.dispatch(deleteHistoryTask(1))
        .catch(() => {
            expect(mockStore.getActions().length).toBe(0);
        })
    });
});