import {CurrentTasksActions, CurrentTasksState, GET_CURRENT_TASKS} from "../types/currentTasks";

export const currentTasks = (state: CurrentTasksState = [], action: CurrentTasksActions): CurrentTasksState => {
    if (action.type === GET_CURRENT_TASKS) {
        return action.tasks
    } else {
        return state
    }
}