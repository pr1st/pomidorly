import {CurrentTasksState, GET_CURRENT_TASKS, GetCurrentTasksAction} from "../../types/currentTasks";
import {currentTasks} from "../currentTasks";
import { START_TIMER } from "../../types/timer";


describe("Test current tasks reducers", () => {
    let state: CurrentTasksState;
    beforeEach(() => {
        state = [
            {
                id: 1,
                tag: "tag",
                description: "desc",
                inQueue: 2,
                numberOfPomidors: 5
            }
        ];
    });

    it("get current tasks action", () => {
        const action: GetCurrentTasksAction = {
            type: GET_CURRENT_TASKS,
            tasks: [
                {
                    id: 5,
                    tag: "tag2",
                    description: "desc",
                    inQueue: 3,
                    numberOfPomidors: 5
                }, {
                    id: 3,
                    tag: "tag1",
                    description: "desc",
                    inQueue: 2,
                    numberOfPomidors: 51
                }
            ]
        };
        // @ts-ignore
        const newState = currentTasks(state, action);
        expect(newState).toEqual(action.tasks);
    });

    it("return not changed state", () => {
        const newState = currentTasks(state, {
            type: START_TIMER
        });
        expect(newState).toBe(state);
    });

    it("return init state", () => {
        const newState = currentTasks(undefined, {
            type: START_TIMER
        });
        expect(newState).toEqual([]);
    });
});