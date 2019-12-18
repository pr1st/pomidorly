import {GET_HISTORY_TASKS, GetHistoryTasksAction, HistoryTasksState} from "../../types/historyTasks";
import {historyTasks} from "../historyTasks";
import { START_TIMER } from "../../types/timer";

describe("Test history tasks reducers", () => {
    let state: HistoryTasksState;
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
        const action: GetHistoryTasksAction = {
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
        const newState = historyTasks(state, action);
        expect(newState).toEqual(action.tasks);
    });

    it("return not changed state", () => {
        const newState = historyTasks(state, {
            type: START_TIMER
        });
        expect(newState).toBe(state);
    });

    it("return init state", () => {
        const newState = historyTasks(undefined, {
            type: START_TIMER
        });
        expect(newState).toEqual([]);
    });
});