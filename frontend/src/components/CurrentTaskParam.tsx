import classNames from "classnames";
import React from "react";

export default function CurrentTaskParam(props: { name: string, label: string, value: number | string, onChange: (p: string, v: number | string) => void }) {
    const {name, value, onChange, label} = props;
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