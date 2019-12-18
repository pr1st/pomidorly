import {GET_HISTORY_TASKS, HistoryTasksState} from "../types/historyTasks";
import { AppActions } from "../types";

export const historyTasks = (state: HistoryTasksState = [], action: AppActions): HistoryTasksState => {
    if (action.type === GET_HISTORY_TASKS) {
        return action.tasks
    } else {
        return state
    }
}