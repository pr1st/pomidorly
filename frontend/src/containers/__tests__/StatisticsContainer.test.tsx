import React from 'react';
import {shallow} from "enzyme";
import configureMockStore from 'redux-mock-store';
import StatisticsContainer from '../StatisticsContainer';


describe("Test statistics container", () => {
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
        container = shallow(<StatisticsContainer store={store}/>);
        componentProps = container.prop("children").props;
    });

    it("render component", () => {
        expect(container.length).toEqual(1);
    });

    it("state to props", () => {
        expect(componentProps.tasks).toEqual(initialState.historyTasks);
    });
});