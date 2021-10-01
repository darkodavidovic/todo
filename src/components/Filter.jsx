import { EditorContext } from 'providers/EditorProvider'
import { useContext, useEffect, useState } from 'react'
import "styles/Filter.scss"

function Filter({ toFilter, filtered }) {

    const { setEditorOpen } = useContext(EditorContext)

    const [filter, setFilter] = useState({
        priority: true,
        status: false,
        date: ""
    })

    const checkedBox = (box) => {
        switch (box) {
            case "status":
                if (!filter.status) setFilter({ ...filter, status: true, priority: false })
                if (filter.status && !filter.priority) setFilter({ ...filter, status: false })
                break;
            case "priority":
                if (!filter.priority) setFilter({ ...filter, priority: true, status: false })
                if (filter.priority && !filter.status) setFilter({ ...filter, priority: false })
                break;
        }
    }



    useEffect(() => {

        if (filter.status) {
            const newTasks = toFilter.filter(task => task.taskStatus === "new")
            const inprogress = toFilter.filter(task => task.taskStatus === "in_progress")
            const complete = toFilter.filter(task => task.taskStatus === "complete")
            const sorted = [...newTasks, ...inprogress, ...complete]
            filtered(sorted)
            return
        }

        if (filter.priority) {
            const high = toFilter.filter(task => task.taskPriority === "high")
            const medium = toFilter.filter(task => task.taskPriority === "medium")
            const low = toFilter.filter(task => task.taskPriority === "low")
            const sorted = [...high, ...medium, ...low]
            filtered(sorted)
            return
        }

        filtered(toFilter)


    }, [filter, toFilter])

    return (
        <div className="Filter">
            <h2 className="title">FILTER</h2>

            <div className="filter-commands">
                <label>By Priority</label>
                <input className="checkbox" checked={filter.priority} type="checkbox" onChange={(e) => { checkedBox("priority") }} />

                <label>By Status</label>
                <input className="checkbox" checked={filter.status} type="checkbox" onChange={(e) => { checkedBox("status") }} />

                <input className="input-search" type="date" onChange={(e) => setFilter({ ...filter, date: e.target.value })} value={filter.date} /> <button className="button-search">search</button>

                <button className="new-task-button" onClick={() => setEditorOpen(true)}>add new task</button>
            </div>

        </div>
    )
}

export default Filter
