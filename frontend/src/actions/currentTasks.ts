import {CurrentTasksState, CurrentTaskState, GET_CURRENT_TASKS} from "../types/currentTasks";
import {Dispatch} from "react";
import {AppState} from "../types";

function localGetCurrentTasksAction(tasks: CurrentTasksState) {
    return {
        type: typeof GET_CURRENT_TASKS,
        tasks
    }
}


export function fetchCurrentTasks() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        console.log("fetch cur tasks")
        console.log("")
    }
}

export function createCurrentTask(tag: string, description: string, numberOfPomidors: number) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        console.log("create cur tasks")
        console.log("tag:" + tag)
        console.log("description:" + description)
        console.log("numberOfPomidors:" + numberOfPomidors)
        console.log("")
    }
}

export function updateCurrentTask(updatedTask: CurrentTaskState) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        console.log("update cur tasks")
        console.log("new task:" + updatedTask)
        console.log("")
    }
}

export function deleteCurrentTask(taskId: number) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        console.log("delete cur tasks")
        console.log("task id:" + taskId)
        console.log("")
    }
}

export function swapCurrentTasks(taskId1: number, taskId2: number) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        console.log("swap cur tasks")
        console.log("task id1:" + taskId1)
        console.log("task id2:" + taskId2)
        console.log("")
    }
}

