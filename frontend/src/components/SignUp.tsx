import React from 'react';
import "bootstrap/dist/css/bootstrap.css"
import classNames from "classnames";

export type StateProps = {
    errorMessage: string
}

export type DispatchProps = {
    signUp: (userName: string, password: string) => void,
    setErrorMessage: (message: string) => void
}

type State = {
    name: string,
    password: string,
    passwordAgain: string
}

class SignUp extends React.Component<DispatchProps & StateProps, State> {
    constructor(props: DispatchProps & StateProps) {
        super(props);
        this.state = {
            name: "",
            password: "",
            passwordAgain: ""
        }
    }

    setName = (name: string) => {
        this.setState({
            ...this.state,
            name
        })
    };

    setPassword = (password: string) => {
        this.setState({
            ...this.state,
            password
        })
    };

    setPasswordAgain = (passwordAgain: string) => {
        this.setState({
            ...this.state,
            passwordAgain
        })
    };

    signUp = () => {
        const {name, password, passwordAgain} = this.state
        const {setErrorMessage, signUp} = this.props
        if (name === "" || password === "") {
            setErrorMessage("Enter both name and password")
        } else if (password !== passwordAgain) {
            setErrorMessage("Passwords are not similar")
        } else {
            signUp(name, password)
        }
    };

    render() {
        const {name, password, passwordAgain} = this.state
        const {errorMessage} = this.props
        const btnClass = classNames("btn", "btn-primary", "btn-lg");
        return (
            <div onKeyDown={e => {
                if (e.keyCode === 13 || e.which === 13) {
                    e.preventDefault();
                    this.signUp()
                }
            }} className={classNames("SignUp")}>
                <label>
                    Name
                    <input
                        className={classNames("form-control")}
                        value={name}
                        onChange={
                            (e: { target: HTMLInputElement }) => {
                                this.setName(e.target.value)
                            }
                        }
                    />
                </label>
                <label>
                    Password
                    <input
                        className={classNames("form-control")}
                        value={password}
                        onChange={
                            (e: { target: HTMLInputElement }) => {
                                this.setPassword(e.target.value)
                            }
                        }
                    />
                </label>
                <label>
                    Password again
                    <input
                        className={classNames("form-control")}
                        value={passwordAgain}
                        onChange={
                            (e: { target: HTMLInputElement }) => {
                                this.setPasswordAgain(e.target.value)
                            }
                        }
                    />
                </label>
                <button className={btnClass}
                        onClick={this.signUp}>
                    Sign up
                </button>
                {errorMessage ?
                    <h5 className={classNames("Error")}>
                        {errorMessage}
                    </h5>
                    :
                    null
                }
            </div>
        );
    }
}

export default SignUp