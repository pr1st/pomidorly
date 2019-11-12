import { connect } from 'react-redux';
import Timer, {DispatchProps, StateProps} from "../components/Timer";
import {Dispatch} from "react";
import {getTimerConfig, nextSecond, pauseTimer, skipTimer, startTimer, stopTimer} from "../actions/timer";
import {TimerActions, TimerConfigState} from "../types/timer";
import {AppState} from "../types";


const mapStateToProps = (state: AppState) : StateProps => {
    return {
        ...state.timer
    };
};

const mapDispatchToProps = (dispatch : Dispatch<TimerActions>) : DispatchProps  => {
    return ({
        nextSecond: () => dispatch(nextSecond()),
        pauseTimer: () => dispatch(pauseTimer()),
        skipTimer: () => dispatch(skipTimer()),
        startTimer: () => dispatch(startTimer()),
        stopTimer: () => dispatch(stopTimer()),
        setConfig: (timerConfig: TimerConfigState) => dispatch(getTimerConfig(timerConfig))
    })
};


const connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default connector(Timer);