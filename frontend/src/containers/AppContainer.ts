import {connect} from "react-redux";
import {AppState} from "../types";
import App, {DispatchProps, StateProps} from "../components/App";
import {Dispatch} from "react";
import {changePageToMain, changePageToSignIn, changePageToSignUp, changePageToStatistics} from "../actions/currentPage";

const mapStateToProps = (state: AppState) : StateProps => {
    return {
        currentPage: state.currentPage
    };
};

const mapDispatchToProps = (dispatch : Dispatch<any>) : DispatchProps  => {
    return {
        toMain: () => dispatch(changePageToMain()),
        toStatistics: () => dispatch(changePageToStatistics()),
        toSignIn: () => dispatch(changePageToSignIn()),
        toSignUp: () => dispatch(changePageToSignUp())
    }
};


const connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default connector(App);