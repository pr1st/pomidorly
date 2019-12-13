import {AuthActions, AuthState, REFRESH_TOKEN, LOG_OUT, SET_ERROR_MESSAGE} from "../types/auth";
import {CurrentPageActions, SIGN_IN, CHANGE_PAGE} from "../types/currentPage";
import { AppActions } from "../types";


const initState: AuthState = {
    token: {
        token: "",
        expiresIn: 0
    },
    userName: "",
    errorMessage: ""
};

export const auth = (state: AuthState = initState, action: AppActions): AuthState => {
    switch (action.type) {
        case SIGN_IN: {
            return {
                errorMessage: "",
                userName: action.userName,
                token: {
                    ...action.token
                }
            }
        }
        case REFRESH_TOKEN: {
            return {
                errorMessage: "",
                userName: state.userName,
                token: {
                    ...action.token
                }
            }
        }
        case LOG_OUT: {
            return initState
        }
        case SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        case CHANGE_PAGE: {
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