import React from 'react';
import "bootstrap/dist/css/bootstrap.css"
import classNames from "classnames";

type Props = {
    toMain: () => void,
    toStatistics: () => void,
    toSignUp: () => void,
    toSignIn: () => void,
    userName: string,
    logOut: () => void
}

const Header = (props: Props) => {
    const {toMain, toStatistics, toSignIn, toSignUp, userName, logOut} = props;
    const btnClass = classNames("btn", "btn-success", "btn-lg");
    let login;
    if (userName === "") {
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
    } else {
        login = (
            <div className={classNames("Login")}>
                <p>
                    {userName}
                </p>
                <button className={btnClass}
                        onClick={logOut}>
                    Log out
                </button>
            </div>
        )
    }
    return (
        <div className={classNames("Header")}>
            <div className={classNames("Page")}>
                <button className={btnClass}
                        onClick={toMain}
                        disabled={userName === ""}>
                    Main
                </button>
                <button className={btnClass}
                        onClick={toStatistics}
                        disabled={userName === ""}>
                    Statistics
                </button>
            </div>
            {login}
        </div>
    )
};

export default Header;