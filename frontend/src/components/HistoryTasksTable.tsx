import React from 'react';
import classNames from "classnames";
import {HistoryTasksState} from "../types/historyTasks";
import HistoryTask from "./HistoryTask";

export type StateProps = {
    tasks: HistoryTasksState
};

export type DispatchProps = {
    deleteTask: (id: number) => void,
    repeatTask: (tag: string, description: string) => void,
}

const HistoryTasksTable = ({deleteTask, repeatTask, tasks}: StateProps & DispatchProps) => {
    const sortedTasks = tasks.sort((a, b) => b.timeFinished - a.timeFinished);
    return (
        <div className={classNames("HistoryTasks")}>
            <h1>History Tasks</h1>
            <table className="table table-bordered table-responsive-md table-striped">
                <tbody>
                <tr>
                    <th>Tag</th>
                    <th>Description</th>
                    <th>Time Finished</th>
                    <th>Repeat</th>
                    <th>Remove</th>
                </tr>
                {sortedTasks
                    .map((task, index) => {
                        const {tag, description, id, timeFinished} = task;
                        return (
                            <HistoryTask
                                id={id}
                                tag={tag}
                                description={description}
                                timeFinished={timeFinished}
                                repeatTask={repeatTask}
                                deleteTask={deleteTask}
                                key={id}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryTasksTable;