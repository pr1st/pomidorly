import React from 'react';
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.css"
import {HistoryTaskState} from "../types/historyTasks";

export type StateProps = HistoryTaskState

export type DispatchProps = {
    deleteTask: (id: number) => void,
    repeatTask: (tag: string, description: string) => void,
}

const HistoryTask = (props: StateProps & DispatchProps) => {
    const {id, tag, description, timeFinished, repeatTask, deleteTask, } = props
    return (
        <tr>
            <td>{tag}</td>
            <td>{description}</td>
            <td>{new Date(timeFinished).toLocaleString()}</td>
            <td>
                <button
                    className={classNames("btn", "btn-outline-primary")}
                    onClick={e => {
                        repeatTask(tag, description)
                    }}
                >
                    Repeat
                </button>
            </td>
            <td>
                <button
                    className={classNames("btn", "btn-outline-danger")}
                    onClick={e => {
                        deleteTask(id)
                    }}
                >
                    Remove
                </button>
            </td>
        </tr>
    )
}

export default HistoryTask;