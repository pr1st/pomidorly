import { connect } from 'react-redux';
import Statistics, {StateProps} from "../components/Statistics";
import {AppState} from "../types";


const mapStateToProps = (state: AppState) : StateProps => {
    return {
        tasks: state.historyTasks
    };
};


const connector = connect(
    mapStateToProps
);

export default connector(Statistics);