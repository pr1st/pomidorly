import { connect } from 'react-redux';
import SignUp, {DispatchProps, StateProps} from "../components/SignUp";
import {AppState} from "../types";
import {Dispatch} from "react";
import {setErrorMessage, signUp} from "../actions/auth";


const mapStateToProps = (state: AppState) : StateProps => {
    return {
        errorMessage: state.auth.errorMessage
    };
};

const mapDispatchToProps = (dispatch : Dispatch<any>) : DispatchProps  => {
    return {
        setErrorMessage: message => dispatch(setErrorMessage(message)),
        signUp: (userName, password) => dispatch(signUp(userName, password))
    }
};


const connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default connector(SignUp);