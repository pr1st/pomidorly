import {AuthActions, AuthState} from "../types/auth";


const initState: AuthState = {
    token: {
        token: "",
        expiresIn: 0
    },
    userName: "",
    errorMessage: ""
};

export const auth = (state: AuthState = initState, action: AuthActions) : AuthState => {
    // @ts-ignore
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
        // hacks, dont do it at home
        //@ts-ignore
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
}