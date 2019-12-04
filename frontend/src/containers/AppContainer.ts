import {connect} from "react-redux";
import {AppState} from "../types";
import App, {DispatchProps, StateProps} from "../components/App";
import {Dispatch} from "react";
import {changePageToMain, changePageToSignIn, changePageToSignUp, changePageToStatistics} from "../actions/currentPage";
import {logOut} from "../actions/auth";

const mapStateToProps = (state: AppState): StateProps => {
    return {
        currentPage: state.currentPage,
        userName: state.auth.userName
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
    return {
        toMain: () => dispatch(changePageToMain()),
        toStatistics: () => dispatch(changePageToStatistics()),
        toSignIn: () => dispatch(changePageToSignIn()),
        toSignUp: () => dispatch(changePageToSignUp()),
        logOut: () => dispatch(logOut())
    }
};


const connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default connector(App);