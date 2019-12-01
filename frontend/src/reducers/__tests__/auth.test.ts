import {
    AuthState,
    LOG_OUT,
    REFRESH_TOKEN,
    RefreshTokenAction,
    SET_ERROR_MESSAGE,
    SIGN_IN,
    SignInAction
} from "../../types/auth";
import {auth} from "../auth";
import {CHANGE_PAGE, MAIN_PAGE} from "../../types/currentPage";

describe("Test fetch reducers", () => {
    let initState : AuthState;
    beforeEach(() => {
        initState = {
            errorMessage: "",
            userName: "",
            token: {
                expiresIn: 0,
                token: ""
            }
        }
    });

    it("sign in action", () => {
        const action : SignInAction = {
            type: SIGN_IN,
            userName: "user",
            token: {
                token: "ABC",
                expiresIn: 123
            }
        };
        const newState = auth(initState, action);
        expect(newState).toEqual({
            errorMessage: "",
            userName: action.userName,
            token: {
                ...action.token
            }
        });
    });

    it("refresh token action", () => {
        const action : RefreshTokenAction = {
            type: REFRESH_TOKEN,
            token: {
                token: "ABCC",
                expiresIn: 123
            }
        };
        const newState = auth(initState, action);
        expect(newState).toEqual({
            errorMessage: "",
            userName: initState.userName,
            token: {
                ...action.token
            }
        });
    });

    it("log out action", () => {
        initState.userName = "US";
        initState.token = {
            token: "asd",
            expiresIn: 1
        };
        const  newState = auth(initState, {type: LOG_OUT});
        expect(newState).toEqual({
            errorMessage: "",
            userName: "",
            token: {
                expiresIn: 0,
                token: ""
            }
        });
    });

    it("set error message action", () => {
        const msg = "MSG";
        const newState = auth(initState, {type: SET_ERROR_MESSAGE, message: msg});
        expect(newState).toEqual({
            ...initState,
            errorMessage: msg
        });
    });

    it("change page action", () => {
        initState.errorMessage = "ASD";
        const newState = auth(initState, {type: CHANGE_PAGE, page: MAIN_PAGE});
        expect(newState).toEqual({
            ...initState,
            errorMessage: ""
        });
    });
});