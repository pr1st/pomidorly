import React from 'react';
import "bootstrap/dist/css/bootstrap.css"
import classNames from "classnames";
import {HistoryTasksState} from "../types/historyTasks";
// @ts-ignore
import {Chart} from "react-charts";

export type StateProps = {
    tasks: HistoryTasksState
};

function Statistics(props: StateProps) {
    const sortedTasks = [...props.tasks].sort((a, b) => a.timeFinished - b.timeFinished);
    const day1 = new Date(sortedTasks[0].timeFinished);
    const getNumberOfDaysFromDay1 = (time: Date) => {
        return Math.floor((time.getTime() - day1.getTime()) / (1000 * 60 * 60 * 24));
    };


    const daysDiff = getNumberOfDaysFromDay1(new Date(sortedTasks[sortedTasks.length - 1].timeFinished));

    const dataArray: any[] = [];
    for (let i = 0; i < daysDiff + 1; i++) {
        dataArray[i] = 0;
    }

    sortedTasks.forEach((task, id) => {
        dataArray[getNumberOfDaysFromDay1(new Date(task.timeFinished))] += 1;
    });

    const data = React.useMemo(
        () => [
            {
                label: "Tasks done",
                data: dataArray.map((value, index) => ({x: day1.getTime() + index * 1000 * 60 * 60 * 24, y: value}))
            },
        ],
        [dataArray, day1]
    );


    const axes = React.useMemo(
        () => [
            {primary: true, type: "time", position: "bottom"},
            {type: "linear", position: "left", name: "Days"}
        ],
        []
    );

    return (
        <div className={classNames("Statistics")}>
            <h3>Tasks done from the first day</h3>
            <Chart data={data} axes={axes}/>
        </div>
    )
}

export default Statistics;