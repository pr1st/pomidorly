import React from 'react'
import '../css/App.css'
import TimerContainer from "../containers/TimerContainer";
import {MAIN_PAGE, SIGN_IN, SIGN_UP, STATISTICS_PAGE} from "../types/currentPage";
import Header from "./Header";
import StatisticsContainer from "../containers/StatisticsContainer";
import SignUpContainer from "../containers/SignUpContainer";
import SignInContainer from "../containers/SignInContainer";

export type StateProps = {
    currentPage: string
}

export type DispatchProps = {
    toMain: () => void,
    toStatistics: () => void,
    toSignIn: () => void,
    toSignUp: () => void
}

const App = (props: StateProps & DispatchProps) => {
    const {toStatistics, toMain, currentPage, toSignIn, toSignUp} = props;
    let inner;
    switch (currentPage) {
        case MAIN_PAGE:
            inner = (
                <TimerContainer/>
            );
            break;
        case STATISTICS_PAGE:
            inner = <StatisticsContainer/>;
            break;
        case SIGN_UP:
            inner = <SignUpContainer/>;
            break;
        case SIGN_IN:
            inner = <SignInContainer/>;
            break;
        default:
            throw new Error("Invalid State")
    }

    return (
        <div className="App">
            <Header toMain={toMain}
                    toStatistics={toStatistics}
                    toSignIn={toSignIn}
                    toSignUp={toSignUp}/>
            {inner}
        </div>
    )
};

export default App;
