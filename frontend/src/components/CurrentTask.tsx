import React from 'react';
import {CurrentTaskState} from "../types/currentTasks";

export type StateProps = CurrentTaskState

export type DispatchProps = {
    updateTask: (updateTask: CurrentTaskState) => void,
    deleteTask: (id: number) => void,
    swapTask: (id: number, isMoveUp: boolean) => void,
}

const CurrentTask = ({ id, tag, description, numberOfPomidors, inQueue, deleteTask, swapTask, updateTask}: StateProps & DispatchProps) => (
    <tr>
        <td>{tag}</td>
        <td>{description}</td>
        <td>{numberOfPomidors}</td>
        <td>
            <button className="btn-success btn-sm" onClick={e => {
                swapTask(id, true)
            }}>
                ⮝
            </button>
            <button className="btn-success btn-sm" onClick={e => {
                swapTask(id, false)
            }}>
                ⮟
            </button>
        </td>
        <td>updateHere</td>
        <td>deleteHere</td>
    </tr>
);

export default CurrentTask;