import React from 'react';
import {CurrentTaskState} from "../types/currentTasks";
import classNames from "classnames";
import UpdateCurrentTaskDialog from "./UpdateCurrentTaskDialog";
import "bootstrap/dist/css/bootstrap.css"

export type StateProps = CurrentTaskState

export type DispatchProps = {
    updateTask: (updateTask: CurrentTaskState) => void,
    deleteTask: (id: number) => void,
    swapTask: (id: number, isMoveUp: boolean) => void,
}

const CurrentTask = (props: StateProps & DispatchProps) => {
    const {id, tag, description, numberOfPomidors, swapTask} = props
    return (
        <tr>
            <td>{tag}</td>
            <td>{description}</td>
            <td>{numberOfPomidors}</td>
            <td>
                <button className={classNames("btn", "btn-outline-dark")} onClick={e => {
                    swapTask(id, true)
                }}>
                    ⮝
                </button>
                <button className={classNames("btn", "btn-outline-dark")} onClick={e => {
                    swapTask(id, false)
                }}>
                    ⮟
                </button>
            </td>
            <td>
                <button
                    className={classNames("btn", "btn-outline-warning")}
                    data-toggle="modal"
                    data-target={`#updateCurrentTaskModal-${id}`}
                    data-backdrop="static"
                >
                    Update
                </button>
                <UpdateCurrentTaskDialog {...props}/>
            </td>
            <td>
                <button
                    className={classNames("btn", "btn-outline-danger")}
                    onClick={e => {
                        props.deleteTask(id)
                    }}
                >
                    Remove
                </button>
            </td>
        </tr>
    )
};

export default CurrentTask;