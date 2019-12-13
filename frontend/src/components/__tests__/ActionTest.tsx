import React from 'react';
import AddCurrentTask from "../AddCurrentTask";


describe("Third snapshot test", () => {

    it("AddCurrentTask actions", () => {
        const addAction = jest.fn();

        const component = new AddCurrentTask({addTask: addAction});

        component.setState = function (newState: any) {
            this.state = newState;
        };

        const testParams = {
            tag: "myTag",
            description: "myDescript",
            numberOfPomidors: 3
        }
        component.setParam("numberOfPomidors", testParams.numberOfPomidors);
        component.setParam("tag", testParams.tag);
        component.setParam("description", testParams.description);
        expect(component.state).toEqual(testParams);

        component.add();
        expect(addAction.mock.calls[0]).toEqual([
            testParams.tag,
            testParams.description,
            testParams.numberOfPomidors
        ]);
        expect(component.state).toEqual({
            tag: "",
            description: "",
            numberOfPomidors: 1 
        });
    });
});