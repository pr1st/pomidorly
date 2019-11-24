import { connect } from 'react-redux';
import {AppState} from "../types";
import CurrentTasksTable, {DispatchProps, StateProps} from "../components/CurrentTasksTable";
import {Dispatch} from "react";
import {createCurrentTask, deleteCurrentTask, swapCurrentTasks, updateCurrentTask} from "../actions/currentTasks";

const mapStateToProps = (state: AppState) : StateProps => {
    return {
        tasks: state.currentTasks
    };
};

const mapDispatchToProps = (dispatch : Dispatch<any>) : DispatchProps  => {
    return {
        swapTask: (id1, id2) => dispatch(swapCurrentTasks(id1, id2)),
        deleteTask: id => dispatch(deleteCurrentTask(id)),
        addTask: (tag, description, numberOfPomidors) => dispatch(createCurrentTask(tag,description,numberOfPomidors)),
        updateTask: updateTask => dispatch(updateCurrentTask(updateTask))
    }
};


const connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default connector(CurrentTasksTable);