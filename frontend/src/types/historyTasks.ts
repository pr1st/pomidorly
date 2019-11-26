export const GET_HISTORY_TASKS = "GET_HISTORY_TASKS";

// actions
export interface GetHistoryTasksAction {
    type: typeof GET_HISTORY_TASKS
    tasks: HistoryTasksState
}

export type HistoryTasksActions = GetHistoryTasksAction

// state

export type HistoryTaskState = {
    id: number,
    tag: string,
    description: string,
    timeFinished: number,
}

export type HistoryTasksState = HistoryTaskState[]