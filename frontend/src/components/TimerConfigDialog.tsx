import React from 'react';

import "bootstrap/dist/css/bootstrap.css"
import {TimerConfigState} from "../types/timer";
import classNames from "classnames";


type Props = TimerConfigState & { setConfig: (timerConfig: TimerConfigState) => void }
type State = TimerConfigState

class TimerConfigDialog extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            ...props
        }
    }

    setParam = (paramName: string, value: number | boolean) => {
        if (paramName === "alarmWhenZero") {
            this.setState({
                ...this.state,
                alarmWhenZero: (value as boolean).valueOf()
            })
        } else {
            this.setState({
                    ...this.state,
                    [paramName]: (value as number).valueOf()
                }
            )
        }
    }

    save = () => {
        const setConfig = this.props.setConfig
        setConfig({
            ...this.state
        })
    }

    close = () => {
        this.setState({
            ...this.props
        })
    }

    render() {
        const {alarmWhenZero, longBreakDuration, numberOfPomidorsBeforeLongBreak, pomidorDuration, shortBreakDuration} = this.state

        return (
            <div id={"timerConfigModal"} className={classNames("modal", "fade")} tabIndex={-1}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Configuration properties</h5>
                            <button type="button" className="close" data-dismiss="modal" onClick={this.close} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <NumberParam name={"pomidorDuration"} label={"Pomidor duration"} value={pomidorDuration}
                                             onChange={this.setParam}/>
                            </div>
                            <div>
                                <NumberParam name={"shortBreakDuration"} label={"Short break duration"}
                                             value={shortBreakDuration} onChange={this.setParam}/>
                            </div>
                            <div>
                                <NumberParam name={"longBreakDuration"} label={"Long break duration"}
                                             value={longBreakDuration} onChange={this.setParam}/>
                            </div>
                            <div>
                                <NumberParam name={"numberOfPomidorsBeforeLongBreak"}
                                             label={"Number of pomidors before long break"}
                                             value={numberOfPomidorsBeforeLongBreak} onChange={this.setParam}/>
                            </div>
                            <div>
                                <BoolParam name={"alarmWhenZero"}
                                           label={"Alarm when zero"}
                                           value={alarmWhenZero}
                                           onChange={this.setParam}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.save}>Save changes</button>
                            <button id="closeDialog" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.close}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function NumberParam(props: { name: string, label: string, value: number, onChange: (p: string, v: number) => void }) {
    const {name, value, onChange, label} = props
    return (
        <label>
            {label}:
            <input
                className={classNames("form-control")}
                value={value}
                type="number"
                onChange={
                    (e: { target: HTMLInputElement }) => {
                        const v = Number.parseInt(e.target.value)
                        if (v !== undefined) {
                            onChange(name, v)
                        }
                    }
                }
            />
        </label>
    )
}

function BoolParam(props: { name: string, label: string, value: boolean, onChange: (p: string, v: boolean) => void }) {
    const {name, value, onChange, label} = props
    return (
        <label>
            {label}
            <select
                value={value ? "true" : "false"}
                onChange={(e) => onChange(name, (e.target.value === "true"))}
                className={classNames("form-control")}>
                <option key={"true"} value={"true"}>{"true"}</option>
                <option key={"false"} value={"false"}>{"false"}</option>
            </select>
        </label>
    )
}

export default TimerConfigDialog;