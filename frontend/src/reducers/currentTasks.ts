import {CurrentTasksState, GET_CURRENT_TASKS, GetCurrentTasksAction} from "../types/currentTasks";

const initState = [
    {
        id:1,
        inQueue: 2,
        description: "DESC",
        numberOfPomidors:23,
        tag:"TAG"
    },
    {
        id:2,
        inQueue: 3,
        description: "DESC2",
        numberOfPomidors:34,
        tag:"TAG2"
    },
    {
        id:3,
        inQueue: 4,
        description: "DESC3",
        numberOfPomidors:34,
        tag:"TAG3"
    },
    {
        id:4,
        inQueue: 6,
        description: "DESC4",
        numberOfPomidors:2,
        tag:"TAF4"
    },
    {
        id:5,
        inQueue: 87,
        description: "DES5",
        numberOfPomidors:33,
        tag:"TAG5"
    }
];


export const currentTasks = (state: CurrentTasksState = initState, action: GetCurrentTasksAction) : CurrentTasksState => {
    if (action.type === GET_CURRENT_TASKS) {
        return action.tasks
    } else {
        return state
    }
}