export const GET_CURRENT_TASKS = "GET_CURRENT_TASKS";

// actions
export interface GetCurrentTasksAction {
    type: typeof GET_CURRENT_TASKS
    tasks: CurrentTasksState
}

export type CurrentTasksActions = GetCurrentTasksAction

// state

export type CurrentTaskState = {
    id: number,
    tag: string,
    description: string,
    numberOfPomidors: number,
    inQueue: number
}

export type CurrentTasksState = CurrentTaskState[]