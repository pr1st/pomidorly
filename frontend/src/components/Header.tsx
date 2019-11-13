import React from 'react';

import "bootstrap/dist/css/bootstrap.css"
import classNames from "classnames";

type Props = {
    toMain: () => void,
    toStatistics: () => void,
    toSignUp: () => void,
    toSignIn: () => void,
    // userName: string
}

const Header = (props: Props) => {
    const {toMain, toStatistics, toSignIn, toSignUp} = props;
    const btnClass = classNames("btn", "btn-outline-success", "btn-lg");
    let login;
    if (true) {
        login = (
            <div className={classNames("Login")}>
                <button className={btnClass}
                        onClick={toSignIn}>
                    Sign in
                </button>
                <button className={btnClass}
                        onClick={toSignUp}>
                    Sign up
                </button>
            </div>
        )
    }
    return (
        <div className={classNames("Header")}>
            <div className={classNames("Page")}>
                <button className={btnClass}
                        onClick={toMain}>
                    Main
                </button>
                <button className={btnClass}
                        onClick={toStatistics}>
                    Statistics
                </button>
            </div>
            {login}
        </div>
    )
}

export default Header;