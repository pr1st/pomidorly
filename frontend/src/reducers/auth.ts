import {AuthActions, AuthState} from "../types/auth";
import {CurrentPageActions} from "../types/currentPage";


const initState: AuthState = {
    token: {
        token: "",
        expiresIn: 0
    },
    userName: "",
    errorMessage: ""
};

export const auth = (state: AuthState = initState, action: AuthActions | CurrentPageActions): AuthState => {
    switch (action.type) {
        case "SIGN_IN": {
            return {
                errorMessage: "",
                userName: action.userName,
                token: {
                    ...action.token
                }
            }
        }
        case "REFRESH_TOKEN": {
            return {
                errorMessage: "",
                userName: state.userName,
                token: {
                    ...action.token
                }
            }
        }
        case "LOG_OUT": {
            return initState
        }
        case "SET_ERROR_MESSAGE": {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        case "CHANGE_PAGE": {
            return {
                ...state,
                errorMessage: ""
            }
        }
        default: {
            return state
        }
    }
};