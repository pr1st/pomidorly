import React from 'react';
import {shallow} from "enzyme";
import configureMockStore from 'redux-mock-store';
import { MAIN_PAGE } from '../../types/currentPage';
import AppContainer from '../AppContainer';
import { logOut } from '../../actions/auth';
import { changePageToMain, changePageToSignIn, changePageToSignUp, changePageToStatistics } from '../../actions/currentPage';

jest.mock("../../actions/auth");
jest.mock("../../actions/currentPage");

describe("Test sign in container", () => {
    const initialState = {
        currentPage: MAIN_PAGE,
        auth: {
            userName: "name"
        }
    };
    const configMockStore = configureMockStore();
    let store: any;
    let container: any;
    let componentProps: any;

    beforeEach(() => {
        store = configMockStore(initialState);
        // @ts-ignore
        container = shallow(<AppContainer store={store}/>);
        componentProps = container.prop("children").props;
    });

    it("render component", () => {
        expect(container.length).toEqual(1);
    });

    it("state to props", () => {
        expect(componentProps.currentPage).toEqual(initialState.currentPage);
        expect(componentProps.userName).toEqual(initialState.auth.userName);
    });

    describe("dispatch to props", () => {
        const dummyAction = {type: "DUMMY"};

        it("to Main page", () => {
            // @ts-ignore
            changePageToMain.mockReturnValue(dummyAction);
            componentProps.toMain();
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(changePageToMain.mock.calls.length).toEqual(1);
        });

        it("to sign in page", () => {
            // @ts-ignore
            changePageToSignIn.mockReturnValue(dummyAction);
            componentProps.toSignIn();
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(changePageToSignIn.mock.calls.length).toEqual(1);
        });

        it("to sign up page", () => {
            // @ts-ignore
            changePageToSignUp.mockReturnValue(dummyAction);
            componentProps.toSignUp();
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(changePageToSignUp.mock.calls.length).toEqual(1);
        });

        it("to statistics in page", () => {
            // @ts-ignore
            changePageToStatistics.mockReturnValue(dummyAction);
            componentProps.toStatistics();
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(changePageToStatistics.mock.calls.length).toEqual(1);
        });

        it("log out", () => {
            // @ts-ignore
            logOut.mockReturnValue(dummyAction);
            componentProps.logOut();
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(logOut.mock.calls.length).toEqual(1);
        });
    });
});