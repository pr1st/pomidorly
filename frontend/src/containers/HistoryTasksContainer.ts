import {connect} from 'react-redux';
import {AppState} from "../types";
import {Dispatch} from "react";
import HistoryTasksTable, {DispatchProps, StateProps} from "../components/HistoryTasksTable";
import {createCurrentTask} from "../actions/currentTasks";
import {deleteHistoryTask} from "../actions/historyTasks";

const mapStateToProps = (state: AppState): StateProps => {
    return {
        tasks: state.historyTasks
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
    return {
        repeatTask: (tag, description) => dispatch(createCurrentTask(tag, description, 1)),
        deleteTask: id => dispatch(deleteHistoryTask(id))
    }
};


const connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default connector(HistoryTasksTable);