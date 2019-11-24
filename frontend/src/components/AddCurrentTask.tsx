import React from 'react';
import classNames from "classnames";

type Props = { addTask: (tag: string, description: string, numberOfPomidors: number) => void }
type State = {
    tag: string,
    description: string,
    numberOfPomidors: number
}

const initState = {
    tag: "",
    description: "",
    numberOfPomidors: 1
};

class AddCurrentTask extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = initState
    }

    setParam = (paramName: string, value: number | string) => {
        if (paramName === "numberOfPomidors") {
            this.setState({
                ...this.state,
                numberOfPomidors: (value as number).valueOf()
            })
        } else {
            this.setState({
                    ...this.state,
                    [paramName]: (value as string).valueOf()
                }
            )
        }
    };

    add = () => {
        const {numberOfPomidors, description, tag} = this.state;
        this.props.addTask(tag, description, numberOfPomidors);
        this.setState({
            ...initState
        })
    };

    render() {
        const {numberOfPomidors, description, tag} = this.state

        return (
            <div className={classNames("row", "AddCurrentTask")}>
                <Param name={"tag"}
                       label={"Tag"}
                       value={tag}
                       onChange={this.setParam}
                />
                <Param name={"description"}
                       label={"Description"}
                       value={description}
                       onChange={this.setParam}
                />
                <Param name={"numberOfPomidors"}
                       label={"Number of pomidors"}
                       value={numberOfPomidors}
                       onChange={this.setParam}
                />
                <button type="button" className="btn btn-success" onClick={this.add}>
                    Add
                </button>
            </div>
        )
    }
}

function Param(props: { name: string, label: string, value: number | string, onChange: (p: string, v: number | string) => void }) {
    const {name, value, onChange, label} = props
    return (
        <label className={classNames("Param")}>
            {label}:
            <input className={classNames("form-control")}
                   value={value}
                   type={name === "numberOfPomidors" ? "number" : "text"}
                   onChange={
                       (e: { target: HTMLInputElement }) => {
                           if (name === "numberOfPomidors") {
                               const v = Number.parseInt(e.target.value)
                               if (v !== undefined && v > 0) {
                                   onChange(name, v)
                               }
                           } else {
                               onChange(name, e.target.value)
                           }
                       }
                   }
            />
        </label>
    )
}

export default AddCurrentTask;