import {END_FETCHING, FetchState, START_FETCHING} from "../../types/fetch";
import {fetching} from "../fetch";


describe("Test fetch reducers", () => {
    let state : FetchState;
    beforeEach(() => {
        state = false;
    });

    it("start fetching action", () => {
        const newState = fetching(state, {type: START_FETCHING});
        expect(newState).toBe(true);
    });

    it("end fetching action", () => {
        const newState = fetching(state, {type: END_FETCHING});
        expect(newState).toBe(false);
    });
});