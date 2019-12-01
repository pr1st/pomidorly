import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {END_FETCHING, START_FETCHING} from "../../types/fetch";
import {endFetching, startFetching} from "../fetch";

describe("Test currentPage actions", () => {
    let mockStore: any;

    beforeEach(() => {
        mockStore = configureMockStore([thunk])({});
    });

    it("Start fetching", () => {
        mockStore.dispatch(startFetching());

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({ type: START_FETCHING});
    });

    it("End fetching", () => {
        mockStore.dispatch(endFetching());

        const actions = mockStore.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({ type: END_FETCHING});
    });
});