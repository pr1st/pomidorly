import {CurrentTasksState, GET_CURRENT_TASKS, GetCurrentTasksAction} from "../types/currentTasks";

export const currentTasks = (state: CurrentTasksState = [], action: GetCurrentTasksAction) : CurrentTasksState => {
    if (action.type === GET_CURRENT_TASKS) {
        return action.tasks
    } else {
        return state
    }
}