import {currentPage} from "../currentPage";
import {CHANGE_PAGE, ChangePageToSignUpAction, CurrentPageState, SIGN_IN, SIGN_UP} from "../../types/currentPage";
import {LOG_OUT} from "../../types/auth";
import { START_TIMER } from "../../types/timer";


describe("Test current page reducers", () => {
    let state: CurrentPageState;
    beforeEach(() => {
        state = "";
    });

    it("change page action", () => {
        const action: ChangePageToSignUpAction = {
            type: CHANGE_PAGE,
            page: SIGN_UP
        };
        const newState = currentPage(state, action);
        expect(newState).toEqual(SIGN_UP);
    });

    it("log out action", () => {
        const newState = currentPage(state, {
            type: LOG_OUT
        });
        expect(newState).toEqual(SIGN_IN);
    });

    it("return not changed state", () => {
        const newState = currentPage(state, {
            type: START_TIMER
        });
        expect(newState).toBe(state);
    });

    it("return init state", () => {
        const newState = currentPage(undefined, {
            type: START_TIMER
        });
        expect(newState).toEqual(SIGN_UP);
    });
});