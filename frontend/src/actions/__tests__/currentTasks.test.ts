import {ACCEPT, APPLICATION_JSON, CONTENT_TYPE, request, TOKEN} from "../request";
import {
    createCurrentTask,
    deleteCurrentTask,
    doOnePomidor,
    fetchCurrentTasks,
    updateCurrentTask
} from "../currentTasks";
import {createHistoryTask} from "../historyTasks";
import {GET_CURRENT_TASKS} from "../../types/currentTasks";

jest.mock("../request");
jest.mock("../historyTasks");

describe("Test current task actions", () => {
    let initState: any;
    let dispatch: any;
    let getState: any;

    beforeEach(() => {
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

    it("do one pomidor", async () => {
        // @ts-ignore
        request.mockImplementation(() => {
            return {
                status: 204
            }
        });
        // @ts-ignore
        createHistoryTask.mockImplementation(() => {
        });


        // @ts-ignore
        doOnePomidor()(dispatch, getState);

        expect(dispatch.mock.calls.length).toEqual(2);
        // @ts-ignore
        const mockCreate = createHistoryTask.mock.calls[0];
        expect(mockCreate.length).toEqual(3);
        expect(mockCreate[0]).toEqual(initState.currentTasks[0].tag);
        expect(mockCreate[1]).toEqual(initState.currentTasks[0].description);
        // @ts-ignore
        const mockDelete = dispatch.mock.calls[1];
        expect(mockDelete.length).toEqual(1);


        // @ts-ignore
        createHistoryTask.mockClear();
    });

    it("fetch current task", async () => {
        const responseTasks = [
            {
                id: 1,
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
        await fetchCurrentTasks()(dispatch, getState);

        // @ts-ignore
        const mockedRequest = request.mock.calls[0];
        expect(mockedRequest.length).toEqual(4);
        expect(mockedRequest[1]).toEqual("GET");
        expect(mockedRequest[2]).toEqual("current/tasks");
        expect(mockedRequest[3]).toEqual({
            [ACCEPT]: APPLICATION_JSON,
            [TOKEN]: initState.auth.token.token
        });

        // @ts-ignore
        const mocked = dispatch.mock.calls[0];
        expect(mocked.length).toEqual(1);
        expect(mocked[0]).toEqual({type: GET_CURRENT_TASKS, tasks: responseTasks});
    });

    it("create current task", async () => {
        const requestTask = {
            tag: "dddd",
            description: "asd",
            numberOfPomidors: 3,
        };
        // @ts-ignore
        request.mockResolvedValue({
            status: 201
        });

        // @ts-ignore
        await createCurrentTask(requestTask.tag, requestTask.description, requestTask.numberOfPomidors)(dispatch, getState);

        // @ts-ignore
        const mockedRequest = request.mock.calls[0];
        expect(mockedRequest.length).toEqual(5);
        expect(mockedRequest[1]).toEqual("POST");
        expect(mockedRequest[2]).toEqual("current/tasks");
        expect(mockedRequest[3]).toEqual({
            [CONTENT_TYPE]: APPLICATION_JSON,
            [TOKEN]: initState.auth.token.token
        });
        expect(mockedRequest[4]).toEqual(requestTask);

        // @ts-ignore
        const mocked = dispatch.mock.calls[0];
        expect(mocked.length).toEqual(1);
    });
});