import React from 'react'
import '../css/App.css'
import TimerContainer from "../containers/TimerContainer";
import {MAIN_PAGE, STATISTICS_PAGE} from "../types/currentPage";
import Header from "./Header";
import StatisticsContainer from "../containers/StatisticsContainer";

export type StateProps = {
    currentPage: string
}

export type DispatchProps = {
    toMain: () => void,
    toStatistics: () => void
}

const App = (props: StateProps & DispatchProps) => {
    const {toStatistics, toMain, currentPage} = props;
    let inner;
    if (currentPage === MAIN_PAGE) {
        inner = (
            <TimerContainer/>
        )
    } else if (currentPage === STATISTICS_PAGE) {
        inner = <StatisticsContainer/>
    } else {
        throw new Error("Invalid State")
    }

    return (
        <div className="App">
            <Header toMain={toMain} toStatistics={toStatistics} />
            {inner}
        </div>
    )
};

export default App;
