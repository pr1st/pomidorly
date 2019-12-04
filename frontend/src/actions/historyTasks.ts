import {Dispatch} from "react";
import {
    ACCEPT,
    APPLICATION_JSON,
    CONTENT_TYPE,
    lastCatchResponseError,
    request,
    TOKEN,
    unAuthorisedAction
} from "./request";
import {GET_HISTORY_TASKS, HistoryTasksActions, HistoryTasksState} from "../types/historyTasks";
import {AppState} from "../types";

function localGetHistoryTasksAction(tasks: HistoryTasksState): HistoryTasksActions {
    return {
        type: GET_HISTORY_TASKS,
        tasks
    }
}

export function fetchHistoryTasks() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        return request(
            dispatch,
            "GET",
            "history/tasks",
            {
                [ACCEPT]: APPLICATION_JSON,
                [TOKEN]: getState().auth.token.token
            }
        )
            .then(res => {
                if (res.headers[CONTENT_TYPE] === APPLICATION_JSON) {
                    return res.data
                } else {
                    throw Promise.reject("No Content-type header");
                }
            })
            .then(
                res => {
                    const tasks = (res as HistoryTasksState);
                    dispatch(localGetHistoryTasksAction(tasks))
                }
            )
            .catch(unAuthorisedAction(dispatch))
            .catch(lastCatchResponseError(dispatch))
    }
}

export function createHistoryTask(tag: string, description: string, timeFinished: number) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        return request(
            dispatch,
            "POST",
            "history/tasks",
            {
                [CONTENT_TYPE]: APPLICATION_JSON,
                [TOKEN]: getState().auth.token.token
            },
            {
                tag,
                description,
                timeFinished
            }
        )
            .then(res => {
                if (res.status === 201) {
                    dispatch(fetchHistoryTasks())
                } else {
                    throw Promise.reject("No 201 response");
                }
            })
            .catch(unAuthorisedAction(dispatch))
            .catch(lastCatchResponseError(dispatch))
    }
}

export function deleteHistoryTask(taskId: number) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        return request(
            dispatch,
            "DELETE",
            `history/tasks/${taskId}`,
            {
                [TOKEN]: getState().auth.token.token
            }
        )
            .then(res => {
                if (res.status === 204) {
                    dispatch(fetchHistoryTasks())
                } else {
                    throw Promise.reject("No 201 response");
                }
            })
            .catch(unAuthorisedAction(dispatch))
            .catch(lastCatchResponseError(dispatch))
    }
}

