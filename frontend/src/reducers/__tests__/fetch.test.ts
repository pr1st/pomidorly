import {END_FETCHING, FetchState, START_FETCHING} from "../../types/fetch";
import {fetching} from "../fetch";


describe("Test fetch reducers", () => {
    let state : FetchState;
    beforeEach(() => {
        state = false;
    });

    it("start fetching action", () => {
        state = fetching(state, {type: START_FETCHING});
        expect(state).toBe(true);
    });

    it("end fetching action", () => {
        state = fetching(state, {type: END_FETCHING});
        expect(state).toBe(false);
    });
});