import renderer from "react-test-renderer";
import Timer from "../Timer";
import TimerConfigDialog from "../TimerConfigDialog";
import UpdateCurrentTaskDialog from "../UpdateCurrentTaskDialog";
import React from "react";

describe("second snapshot test", () => {

    const dummy = () => {};


    it("Timer", () => {
        const tree = renderer
            .create(
                <Timer
                    doPomidor={dummy}
                    pauseTimer={dummy}
                    setConfig={dummy}
                    skipTimer={dummy}
                    startTimer={dummy}
                    stopTimer={dummy}
                    config={{
                        shortBreakDuration:1,
                        pomidorDuration:2,
                        alarmWhenZero:false,
                        longBreakDuration:3,
                        numberOfPomidorsBeforeLongBreak:5
                    }}
                    currentState={{
                        isActive:false,
                        currentPomidor:2,
                        startTime:123,
                        timeRemaining:3000,
                        isBreak:false
                    }}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("TimerConfigDialog", () => {
        const tree = renderer
            .create(
                <TimerConfigDialog
                    setConfig={dummy}
                    alarmWhenZero={false}
                    longBreakDuration={2}
                    numberOfPomidorsBeforeLongBreak={3}
                    pomidorDuration={5}
                    shortBreakDuration={123}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("UpdateCurrentTaskDialog", () => {
        const tree = renderer
            .create(
                <UpdateCurrentTaskDialog
                    updateTask={dummy}
                    id={1}
                    description={"ASD"}
                    tag={"ADSD"}
                    numberOfPomidors={2}
                    inQueue={3}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});