import React from 'react';
import renderer from 'react-test-renderer';
import Header from "../Header";
import AddCurrentTask from "../AddCurrentTask";
import CurrentTask from "../CurrentTask";
import CurrentTasksTable from "../CurrentTasksTable";
import HistoryTask from "../HistoryTask";
import HistoryTasksTable from "../HistoryTasksTable";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Statistics from "../Statistics";
import Timer from "../Timer";
import TimerConfigDialog from "../TimerConfigDialog";
import UpdateCurrentTaskDialog from "../UpdateCurrentTaskDialog";

describe("Component snapshot test", () => {

    const dummy = () => {};

    it("AddCurrentTask", () => {
        const tree = renderer
            .create(
                <AddCurrentTask
                    addTask={dummy}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("CurrentTask", () => {
        const tree = renderer
            .create(
                <CurrentTask
                    deleteTask={dummy}
                    description={"DESC"}
                    id={2}
                    inQueue={3}
                    numberOfPomidors={123}
                    swapTask={dummy}
                    tag={"TAG"}
                    updateTask={dummy}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("CurrentTasksTable", () => {
        const tree = renderer
            .create(
                <CurrentTasksTable
                    updateTask={dummy}
                    swapTask={dummy}
                    deleteTask={dummy}
                    addTask={dummy}
                    tasks={[
                        {
                            id:1,
                            numberOfPomidors:123,
                            inQueue:3,
                            description:"ASDASD",
                            tag:"ASD"
                        }, {
                            id:2,
                            numberOfPomidors:1233,
                            inQueue:34,
                            description:"ASDASDAS",
                            tag:"ASDF"
                        }, {
                            id:5,
                            numberOfPomidors:123312,
                            inQueue:2,
                            description:"ds",
                            tag:"d"
                        }
                    ]}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Header", () => {
        const tree = renderer
            .create(
                <Header
                    logOut={dummy}
                    toMain={dummy}
                    toSignIn={dummy}
                    toSignUp={dummy}
                    toStatistics={dummy}
                    userName={"CustomUser"}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("HistoryTask", () => {
        const tree = renderer
            .create(
                <HistoryTask
                    deleteTask={dummy}
                    tag={"ASD"}
                    id={3}
                    description={"AAA"}
                    repeatTask={dummy}
                    timeFinished={111}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("HistoryTasksTable", () => {
        const tree = renderer
            .create(
                <HistoryTasksTable
                    repeatTask={dummy}
                    deleteTask={dummy}
                    tasks={[
                        {
                            id:1,
                            description:"ASDASDdd",
                            tag:"ASDd",
                            timeFinished:123
                        }, {
                            id:2,
                            description:"ASDASDdd",
                            tag:"ASDd",
                            timeFinished:123
                        }, {
                            id:5,
                            description:"ASDASDdd",
                            tag:"ASDd",
                            timeFinished:123
                        }
                    ]}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("SignIn", () => {
        const tree = renderer
            .create(
                <SignIn
                    setErrorMessage={dummy}
                    signIn={dummy}
                    errorMessage={"Error"}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("SignUp", () => {
        const tree = renderer
            .create(
                <SignUp
                    setErrorMessage={dummy}
                    signUp={dummy}
                    errorMessage={"Err"}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Statistics", () => {
        const tree = renderer
            .create(
                <Statistics
                    tasks={[
                        {
                            id:1,
                            description:"ASDASDdd",
                            tag:"ASDd",
                            timeFinished:123
                        }, {
                            id:2,
                            description:"ASDASDdd",
                            tag:"ASDd",
                            timeFinished:123
                        }, {
                            id:5,
                            description:"ASDASDdd",
                            tag:"ASDd",
                            timeFinished:123
                        }
                    ]}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});