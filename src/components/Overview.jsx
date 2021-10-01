import { useContext, useEffect, useState } from 'react'
import "styles/Overview.scss"

import {
    Chart,
    Interval,
    Tooltip,
    Axis,
    Coordinate,
    Interaction
} from 'bizcharts';
import { TaskContext } from 'providers/TaskProvider';

const width = 400
function Overview() {


    const { tasks } = useContext(TaskContext)

    const [pie1Data, setPie1Data] = useState([
        { task: "High", count: 0, percent: 0.0 },
        { task: "Low", count: 0, percent: 0.0 },
        { task: "Medium", count: 0, percent: 0.0 }
    ])

    const [pie2Data, setPie2Data] = useState([
        { task: "New", count: 0, percent: 0.0 },
        { task: "In Progress", count: 0, percent: 0.0 },
        { task: "Complete", count: 0, percent: 0.0 }
    ])

    const cols = {
        percent: {
            formatter: val => {
                val = val * 100 + '%';
                return val;
            },
        },
    };

    // percentages calculator
    const percentShare = (value) => {
        const c = (value / tasks.length) * 100
        return c
    }

    const toPercent = (value) => {
        const c = (value / tasks.length) * 100 / 100
        return Number(c)
    }

    // statistic logic
    useEffect(() => {
        if (tasks.length > 0) {

            const high = tasks.filter(task => task.taskPriority === "high").length
            const medium = tasks.filter(task => task.taskPriority === "medium").length
            const low = tasks.filter(task => task.taskPriority === "low").length

            setPie1Data([
                { task: "High", count: percentShare(high), percent: toPercent(high) },
                { task: "Medium", count: percentShare(medium), percent: toPercent(medium) },
                { task: "Low", count: percentShare(low), percent: toPercent(low) }
            ])

            const newTasks = tasks.filter(task => task.taskStatus === "new").length
            const inprogress = tasks.filter(task => task.taskStatus === "in_progress").length
            const complete = tasks.filter(task => task.taskStatus === "complete").length

            setPie2Data([
                { task: "New Tasks", count: percentShare(newTasks), percent: toPercent(newTasks) },
                { task: "In Progress", count: percentShare(inprogress), percent: toPercent(inprogress) },
                { task: "Complete", count: percentShare(complete), percent: toPercent(complete) }
            ])


        }
        // eslint-disable-next-line
    }, [tasks])

    return (
        <div className="Overview">

            <div className="pieChart">
                <span className="title">By Priority</span>
                <Chart width={width} height={320} data={pie1Data} scale={cols} autoFit>
                    <Coordinate type="theta" radius={0.75} />
                    <Tooltip showTitle={false} />
                    <Axis visible={false} />
                    <Interval
                        position="percent"
                        adjust="stack"
                        color="task"
                        style={{
                            lineWidth: 1,
                            stroke: '#fff',
                        }}
                        label={['count', {
                            content: (data) => {
                                return `${data.task}: ${(data.percent * 100).toFixed(2)}%`;
                            },
                        }]}
                    />
                    <Interaction type='element-single-selected' />
                </Chart>
            </div>

            <div className="pieChart">
                <span className="title">By Status</span>
                <Chart width={width} height={320} data={pie2Data} scale={cols} autoFit>
                    <Coordinate type="theta" radius={0.75} />
                    <Tooltip showTitle={false} />
                    <Axis visible={false} />
                    <Interval
                        position="percent"
                        adjust="stack"
                        color="task"
                        style={{
                            lineWidth: 1,
                            stroke: '#fff',
                        }}
                        label={['count', {
                            content: (data) => {
                                return `${data.task}: ${(data.percent * 100).toFixed(2)}%`;
                            },
                        }]}
                    />
                    <Interaction type='element-single-selected' />
                </Chart>
            </div>

        </div>
    )
}

export default Overview
