import React from 'react';
import classNames from "classnames";
import CurrentTaskParam from "./CurrentTaskParam";

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
                <CurrentTaskParam name={"tag"}
                       label={"Tag"}
                       value={tag}
                       onChange={this.setParam}
                />
                <CurrentTaskParam name={"description"}
                       label={"Description"}
                       value={description}
                       onChange={this.setParam}
                />
                <CurrentTaskParam name={"numberOfPomidors"}
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

export default AddCurrentTask;