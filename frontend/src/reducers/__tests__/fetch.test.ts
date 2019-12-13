import {END_FETCHING, FetchState, START_FETCHING} from "../../types/fetch";
import {fetching} from "../fetch";
import { START_TIMER } from "../../types/timer";


describe("Test fetch reducers", () => {
    let state: FetchState;
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

    it("return not changed state", () => {
        const newState = fetching(state, {
            type: START_TIMER
        });
        expect(newState).toBe(state);
    });

    it("return init state", () => {
        const newState = fetching(undefined, {
            type: START_TIMER
        });
        expect(newState).toEqual(false);
    });
});