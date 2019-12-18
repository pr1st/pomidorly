import {connect} from 'react-redux';
import SignIn, {DispatchProps, StateProps} from "../components/SignIn";
import {AppState} from "../types";
import {Dispatch} from "react";
import {setErrorMessage, signIn} from "../actions/auth";


const mapStateToProps = (state: AppState): StateProps => {
    return {
        errorMessage: state.auth.errorMessage
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
    return {
        setErrorMessage: message => dispatch(setErrorMessage(message)),
        signIn: (userName, password) => dispatch(signIn(userName, password))
    }
};


const connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default connector(SignIn);