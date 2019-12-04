import React from 'react';
import {CurrentTasksState, CurrentTaskState} from "../types/currentTasks";
import CurrentTask from "./CurrentTask";
import classNames from "classnames";
import AddCurrentTask from "./AddCurrentTask";

export type StateProps = {
    tasks: CurrentTasksState
};

export type DispatchProps = {
    updateTask: (updateTask: CurrentTaskState) => void,
    deleteTask: (id: number) => void,
    swapTask: (id1: number, id2: number) => void,
    addTask: (tag: string, description: string, numberOfPomidors: number) => void
}

const CurrentTasksTable = ({updateTask, swapTask, deleteTask, addTask, tasks}: StateProps & DispatchProps) => {
    const sortedTasks = tasks.sort((a, b) => a.inQueue - b.inQueue);
    return (
        <div className={classNames("CurrentTasks")}>
            <h1>Current Tasks</h1>
            <AddCurrentTask addTask={addTask}/>
            <table className="table table-bordered table-responsive-md table-striped">
                <tbody>
                <tr>
                    <th>Tag</th>
                    <th>Description</th>
                    <th>Pomidors</th>
                    <th>Sort</th>
                    <th>Update</th>
                    <th>Remove</th>
                </tr>
                {sortedTasks
                    .map((task, index) => {
                        const {tag, description, numberOfPomidors, id, inQueue} = task;
                        return (
                            <CurrentTask
                                id={id}
                                tag={tag}
                                description={description}
                                numberOfPomidors={numberOfPomidors}
                                inQueue={inQueue}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                swapTask={(taskId, isMoveUp) => {
                                    if (isMoveUp && (index - 1 >= 0)) {
                                        swapTask(taskId, sortedTasks[index - 1].id)
                                    } else if (!isMoveUp && (index + 1 < sortedTasks.length)) {
                                        swapTask(taskId, sortedTasks[index + 1].id)
                                    }
                                }}
                                key={id}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CurrentTasksTable;