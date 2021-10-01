import { EditorContext } from 'providers/EditorProvider'
import { useContext, useEffect, useState } from 'react'
import "styles/Filter.scss"

function Filter({ toFilter, filtered }) {

    const { editorOpen, setEditorOpen, editForm, setEditform, editMode, setEditMode, resetState } = useContext(EditorContext)

    const [filter, setFilter] = useState({
        priority: false,
        status: false
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
            <h1>FILTER</h1>

            <label>By Priority</label>
            <input className="checkbox" checked={filter.priority} type="checkbox" onChange={(e) => { checkedBox("priority") }} />

            <label>By Status</label>
            <input className="checkbox" checked={filter.status} type="checkbox" onChange={(e) => { checkedBox("status") }} />


            <button onClick={() => setEditorOpen(true)}>add new task</button>
        </div>
    )
}

export default Filter
