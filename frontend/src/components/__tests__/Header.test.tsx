import React from 'react';
import renderer from 'react-test-renderer';
import Header from "../Header";

describe("Header component test", () => {
    it("renders correctly", () => {
        const dummy = () => {};
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
});