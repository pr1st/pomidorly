import React from 'react';
import {shallow} from "enzyme";
import configureMockStore from 'redux-mock-store';
import SignUpContainer from '../SignUpContainer';
import { signUp, setErrorMessage } from '../../actions/auth';

jest.mock("../../actions/auth");

describe("Test sign up container", () => {
    const initialState = {auth: {errorMessage: "errorMSG"}};
    const configMockStore = configureMockStore();
    let store: any;
    let container: any;
    let componentProps: any;

    beforeEach(() => {
        store = configMockStore(initialState);
        // @ts-ignore
        container = shallow(<SignUpContainer store={store}/>);
        componentProps = container.prop("children").props;
    });

    it("render component", () => {
        expect(container.length).toEqual(1);
    });

    it("state to props", () => {
        expect(componentProps.errorMessage).toEqual(initialState.auth.errorMessage);
    });

    describe("dispatch to props", () => {
        const dummyAction = {type: "DUMMY"};

        it("set error message", () => {
            // @ts-ignore
            setErrorMessage.mockReturnValue(dummyAction);
            componentProps.setErrorMessage("error!");
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(setErrorMessage.mock.calls.length).toEqual(1);
        });

        it("sign up", () => {
            // @ts-ignore
            signUp.mockReturnValue(dummyAction);
            componentProps.signUp("name", "pass");
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(signUp.mock.calls.length).toEqual(1);
        });
    });
});