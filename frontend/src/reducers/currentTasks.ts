import { CurrentTasksState, GET_CURRENT_TASKS} from "../types/currentTasks";
import { AppActions } from "../types";

export const currentTasks = (state: CurrentTasksState = [], action: AppActions): CurrentTasksState => {
    if (action.type === GET_CURRENT_TASKS) {
        return action.tasks
    } else {
        return state
    }
}