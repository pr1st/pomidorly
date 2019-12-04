import {GET_HISTORY_TASKS, HistoryTasksActions, HistoryTasksState} from "../types/historyTasks";

export const historyTasks = (state: HistoryTasksState = [], action: HistoryTasksActions): HistoryTasksState => {
    if (action.type === GET_HISTORY_TASKS) {
        return action.tasks
    } else {
        return state
    }
}