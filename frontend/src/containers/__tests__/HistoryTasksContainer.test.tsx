import React from 'react';
import {shallow} from "enzyme";
import configureMockStore from 'redux-mock-store';
import {createCurrentTask} from "../../actions/currentTasks";
import {deleteHistoryTask} from "../../actions/historyTasks";
import HistoryTasksContainer from '../HistoryTasksContainer';

jest.mock("../../actions/historyTasks");
jest.mock("../../actions/currentTasks");


describe("Test history tasks container", () => {
    const initialState = {
        historyTasks: [ { id: 1 }, { id: 2 } ]
    };
    const configMockStore = configureMockStore();
    let store: any;
    let container: any;
    let componentProps: any;

    beforeEach(() => {
        store = configMockStore(initialState);
        // @ts-ignore
        container = shallow(<HistoryTasksContainer store={store}/>);
        componentProps = container.prop("children").props;
    });

    it("render component", () => {
        expect(container.length).toEqual(1);
    });

    it("state to props", () => {
        expect(componentProps.tasks).toEqual(initialState.historyTasks);
    });

    describe("dispatch to props", () => {
        const dummyAction = {type: "DUMMY"};

        it("repeat tasks", () => {
            // @ts-ignore
            createCurrentTask.mockReturnValue(dummyAction);
            componentProps.repeatTask("t", "d");
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(createCurrentTask.mock.calls.length).toEqual(1);
        });

        it("delete task", () => {
            // @ts-ignore
            deleteHistoryTask.mockReturnValue(dummyAction);
            componentProps.deleteTask(2);
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(deleteHistoryTask.mock.calls.length).toEqual(1);
        });
    });
});