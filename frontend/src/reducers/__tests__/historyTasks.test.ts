import {GET_HISTORY_TASKS, GetHistoryTasksAction, HistoryTasksState} from "../../types/historyTasks";
import {historyTasks} from "../historyTasks";

describe("Test history tasks reducers", () => {
    let state : HistoryTasksState;
    beforeEach(() => {
        state = [
            {
                id: 1,
                tag: "tag",
                description: "desc",
                timeFinished: 12
            }
        ];
    });

    it("get current tasks action", () => {
        const action : GetHistoryTasksAction = {
            type: GET_HISTORY_TASKS,
            tasks: [
                {
                    id: 5,
                    tag: "tag2",
                    description: "desc",
                    timeFinished: 123
                }, {
                    id: 3,
                    tag: "tag1",
                    description: "desc",
                    timeFinished: 10100
                }
            ]
        };
        // @ts-ignore
        const newState = historyTasks(state, action);
        expect(newState).toEqual(action.tasks);
    });
});