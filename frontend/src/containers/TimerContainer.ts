import {connect} from 'react-redux';
import Timer, {DispatchProps, StateProps} from "../components/Timer";
import {Dispatch} from "react";
import {
    fetchTimerConfig,
    pauseTimer,
    putTimerConfig,
    skipTimer,
    startTimer,
    stopTimer
} from "../actions/timer";
import {TimerConfigState} from "../types/timer";
import {AppState} from "../types";
import {doOnePomidor} from "../actions/currentTasks";


const mapStateToProps = (state: AppState): StateProps => {
    return {
        ...state.timer
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
    return ({
        pauseTimer: () => dispatch(pauseTimer()),
        skipTimer: () => dispatch(skipTimer()),
        startTimer: () => dispatch(startTimer()),
        stopTimer: () => dispatch(stopTimer()),
        setConfig: (timerConfig: TimerConfigState) => {
            dispatch(putTimerConfig(timerConfig))
        },
        doPomidor: () => {
            dispatch(doOnePomidor())
        }
    })
};


const connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default connector(Timer);