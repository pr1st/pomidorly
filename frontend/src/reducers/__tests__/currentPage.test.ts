import {currentPage} from "../currentPage";
import {CHANGE_PAGE, ChangePageToSignUpAction, CurrentPageState, SIGN_IN, SIGN_UP} from "../../types/currentPage";
import {LOG_OUT} from "../../types/auth";


describe("Test current page reducers", () => {
    let state : CurrentPageState;
    beforeEach(() => {
        state = "";
    });

    it("change page action", () => {
        const action : ChangePageToSignUpAction = {
            type: CHANGE_PAGE,
            page: SIGN_UP
        };
        const newState = currentPage(state, action);
        expect(newState).toEqual(SIGN_UP);
    });

    it("log out action", () => {
        const action= {
            type: LOG_OUT
        };
        // @ts-ignore
        const newState = currentPage(state, action);
        expect(newState).toEqual(SIGN_IN);
    });
});