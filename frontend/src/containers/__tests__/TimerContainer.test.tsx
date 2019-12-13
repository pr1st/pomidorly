import React from 'react';
import {shallow} from "enzyme";
import configureMockStore from 'redux-mock-store';
import {
    fetchTimerConfig,
    pauseTimer,
    putTimerConfig,
    skipTimer,
    startTimer,
    stopTimer
} from "../../actions/timer";
import {doOnePomidor} from "../../actions/currentTasks";
import TimerContainer from '../TimerContainer';

jest.mock("../../actions/timer");
jest.mock("../../actions/currentTasks");

describe("Test timer container", () => {
    const initialState = {
        timer: {
            currentState: {
                timerRemaining: 123
            },
            config: {
                alarmWhenZero: true
            }
        }
    };
    const configMockStore = configureMockStore();
    let store: any;
    let container: any;
    let componentProps: any;

    beforeEach(() => {
        store = configMockStore(initialState);
        // @ts-ignore
        container = shallow(<TimerContainer store={store}/>);
        componentProps = container.prop("children").props;
    });

    it("render component", () => {
        expect(container.length).toEqual(1);
    });

    it("state to props", () => {
        expect(componentProps.config).toEqual(initialState.timer.config);
        expect(componentProps.currentState).toEqual(initialState.timer.currentState);
    });

    describe("dispatch to props", () => {
        const dummyAction = {type: "DUMMY"};

        it("pause timer", () => {
            // @ts-ignore
            pauseTimer.mockReturnValue(dummyAction);
            componentProps.pauseTimer();
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(pauseTimer.mock.calls.length).toEqual(1);
        });

        it("skip timer", () => {
            // @ts-ignore
            skipTimer.mockReturnValue(dummyAction);
            componentProps.skipTimer();
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(skipTimer.mock.calls.length).toEqual(1);
        });

        it("start timer", () => {
            // @ts-ignore
            startTimer.mockReturnValue(dummyAction);
            componentProps.startTimer();
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(startTimer.mock.calls.length).toEqual(1);
        });

        it("stop timer", () => {
            // @ts-ignore
            stopTimer.mockReturnValue(dummyAction);
            componentProps.stopTimer();
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(stopTimer.mock.calls.length).toEqual(1);
        });

        it("set config ", () => {
            // @ts-ignore
            putTimerConfig.mockReturnValue(dummyAction);
            // @ts-ignore
            fetchTimerConfig.mockReturnValue(dummyAction);
            componentProps.setConfig({config: "dummy config"});
            expect(store.getActions().length).toEqual(2);
            // @ts-ignore
            expect(putTimerConfig.mock.calls.length).toEqual(1);
            // @ts-ignore
            expect(fetchTimerConfig.mock.calls.length).toEqual(1);
        });

        it("do one pomidor ", () => {
            // @ts-ignore
            doOnePomidor.mockReturnValue(dummyAction);
            componentProps.doPomidor();
            expect(store.getActions().length).toEqual(1);
            // @ts-ignore
            expect(doOnePomidor.mock.calls.length).toEqual(1);
        });
    });
});