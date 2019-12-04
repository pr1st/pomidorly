import React from 'react';
import "bootstrap/dist/css/bootstrap.css"
import {CurrentTaskState} from "../types/currentTasks";
import classNames from "classnames";

type Props = CurrentTaskState & { updateTask: (updateTask: CurrentTaskState) => void }
type State = CurrentTaskState

class UpdateCurrentTaskDialog extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...props
        }
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

    save = () => {
        this.props.updateTask({
            ...this.state
        })
    };

    close = () => {
        this.setState({
            ...this.props
        })
    };

    render() {
        const {numberOfPomidors, description, tag, id} = this.state;

        return (
            <div id={`updateCurrentTaskModal-${id}`} className={classNames("modal", "fade")} tabIndex={-1}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update task</h5>
                            <button type="button" className="close" data-dismiss="modal" onClick={this.close}
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>
                                    Id: {id}
                                </label>
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
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                    onClick={this.save}>Save changes
                            </button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={this.close}>Close
                            </button>
                        </div>
                    </div>
                </div>
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
                               const v = Number.parseInt(e.target.value);
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

export default UpdateCurrentTaskDialog;