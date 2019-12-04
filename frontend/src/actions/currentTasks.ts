import {CurrentTasksState, CurrentTaskState, GET_CURRENT_TASKS, GetCurrentTasksAction} from "../types/currentTasks";
import {Dispatch} from "react";
import {AppState} from "../types";
import {
    ACCEPT,
    APPLICATION_JSON,
    CONTENT_TYPE,
    lastCatchResponseError,
    request,
    TOKEN,
    unAuthorisedAction
} from "./request";
import {createHistoryTask} from "./historyTasks";

function localGetCurrentTasksAction(tasks: CurrentTasksState): GetCurrentTasksAction {
    return {
        type: GET_CURRENT_TASKS,
        tasks
    }
}

export function doOnePomidor() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        const task = getState().currentTasks.sort((a, b) => a.inQueue - b.inQueue)[0]
        task.numberOfPomidors = task.numberOfPomidors - 1;
        dispatch(createHistoryTask(task.tag, task.description, Date.now()))
        if (task.numberOfPomidors === 0) {
            dispatch(deleteCurrentTask(task.id));
        } else {
            dispatch(updateCurrentTask(task));
        }
    }
}


export function fetchCurrentTasks() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        return request(dispatch,
            "GET",
            "current/tasks",
            {
                [ACCEPT]: APPLICATION_JSON,
                [TOKEN]: getState().auth.token.token,
            }
        )
            .then(res => {
                if (res.headers[CONTENT_TYPE] === APPLICATION_JSON) {
                    return res.data
                } else {
                    throw Promise.reject("No Content-type header");
                }
            }).then(res => {
                const tasks = (res as CurrentTasksState);
                dispatch(localGetCurrentTasksAction(tasks))
            })
            .catch(unAuthorisedAction(dispatch))
            .catch(lastCatchResponseError(dispatch))
    }
}

export function createCurrentTask(tag: string, description: string, numberOfPomidors: number) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        return request(dispatch,
            "POST",
            "current/tasks",
            {
                [CONTENT_TYPE]: APPLICATION_JSON,
                [TOKEN]: getState().auth.token.token
            },
            {
                tag,
                description,
                numberOfPomidors
            }
        )
            .then(res => {
                if (res.status === 201) {
                    dispatch(fetchCurrentTasks())
                } else {
                    throw Promise.reject("No 201 response");
                }
            })
            .catch(unAuthorisedAction(dispatch))
            .catch(lastCatchResponseError(dispatch))
    }
}

export function updateCurrentTask(updatedTask: CurrentTaskState) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        return request(dispatch,
            "PUT",
            `current/tasks/${updatedTask.id}`,
            {
                [CONTENT_TYPE]: APPLICATION_JSON,
                [TOKEN]: getState().auth.token.token
            },
            {
                tag: updatedTask.tag,
                description: updatedTask.description,
                numberOfPomidors: updatedTask.numberOfPomidors,
            }
        )
            .then(res => {
                if (res.status === 204) {
                    dispatch(fetchCurrentTasks())
                } else {
                    throw Promise.reject("No 204 response");
                }
            })
            .catch(unAuthorisedAction(dispatch))
            .catch(lastCatchResponseError(dispatch))
    }
}

export function deleteCurrentTask(taskId: number) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        return request(dispatch,
            "DELETE",
            `current/tasks/${taskId}`,
            {
                [TOKEN]: getState().auth.token.token
            }
        )
            .then(res => {
                if (res.status === 204) {
                    dispatch(fetchCurrentTasks())
                } else {
                    throw Promise.reject("No 201 response");
                }
            })
            .catch(unAuthorisedAction(dispatch))
            .catch(lastCatchResponseError(dispatch))
    }
}

export function swapCurrentTasks(taskId1: number, taskId2: number) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        return request(dispatch,
            "POST",
            `current/tasks/swap/${taskId1}/${taskId2}`,
            {
                [TOKEN]: getState().auth.token.token
            }
        )
            .then(res => {
                if (res.status === 204) {
                    dispatch(fetchCurrentTasks())
                } else {
                    throw Promise.reject("No 204 response");
                }
            })
            .catch(unAuthorisedAction(dispatch))
            .catch(lastCatchResponseError(dispatch))
    }
}

