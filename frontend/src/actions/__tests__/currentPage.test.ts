import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {changePageToMain, changePageToSignIn, changePageToSignUp, changePageToStatistics} from "../currentPage";
import {CHANGE_PAGE, MAIN_PAGE, SIGN_IN, SIGN_UP, STATISTICS_PAGE} from "../../types/currentPage";

describe("Test currentPage actions", () => {
    let mockStore: any;

    beforeEach(() => {
        mockStore = configureMockStore([thunk])({});
    });

    it("Change page to main", () => {
        mockStore.dispatch(changePageToMain());

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({ type: CHANGE_PAGE, page: MAIN_PAGE});
    });

    it("Change page to statistics", () => {
        mockStore.dispatch(changePageToStatistics());

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({ type: CHANGE_PAGE, page: STATISTICS_PAGE});
    });

    it("Change page to sign up", () => {
        mockStore.dispatch(changePageToSignUp());

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({ type: CHANGE_PAGE, page: SIGN_UP});
    });

    it("Change page to sign in", () => {
        mockStore.dispatch(changePageToSignIn());

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({ type: CHANGE_PAGE, page: SIGN_IN});
    });
});