import React from 'react';
import {shallow} from "enzyme";
import configureMockStore from 'redux-mock-store';
import {createCurrentTask, deleteCurrentTask, swapCurrentTasks, updateCurrentTask} from "../../actions/currentTasks";
import CurrentTasksContainer from '../CurrentTasksContainer';

jest.mock("../../actions/currentTasks");

describe("Test current tasks container", () => {
    const initialState = {
        currentTasks: [ { id: 1 }, { id: 2 } ]
    };
    const configMockStore = configureMockStore();
    let store: any;
    let container: any;
    let componentProps: any;

    beforeEach(() => {
        store = configMockStore(initialState);
        // @ts-ignore
        container = shallow(<CurrentTasksContainer store={store}/>);
        componentProps = container.prop("children").props;
    });

    it("render component", () => {
        expect(container.length).toEqual(1);
    });

    it("state to props", () => {
        expect(componentProps.tasks).toEqual(initialState.currentTasks);
    });

    describe("dispatch to props", () => {
        const dummyAction = {type: "DUMMY"};

        it("swap tasks", () => {
            // @ts-ignore
            swapCurrentTasks.mockReturnValue(dummyAction);
            componentProps.swapTask(1, 2);
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(swapCurrentTasks.mock.calls.length).toEqual(1);
        });

        it("delete task", () => {
            // @ts-ignore
            deleteCurrentTask.mockReturnValue(dummyAction);
            componentProps.deleteTask(2);
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(deleteCurrentTask.mock.calls.length).toEqual(1);
        });

        it("add task", () => {
            // @ts-ignore
            createCurrentTask.mockReturnValue(dummyAction);
            componentProps.addTask("t", "d", 5);
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(createCurrentTask.mock.calls.length).toEqual(1);
        });

        it("update task", () => {
            // @ts-ignore
            updateCurrentTask.mockReturnValue(dummyAction);
            componentProps.updateTask({ id: 3});
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(updateCurrentTask.mock.calls.length).toEqual(1);
        });
    });
});