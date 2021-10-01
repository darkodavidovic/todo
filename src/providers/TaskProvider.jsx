import { useState, createContext, useEffect } from 'react'

export const TaskContext = createContext()

function TaskProvider(props) {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const local = localStorage.getItem("tasks")
        local && setTasks(JSON.parse(local))
    }, [])

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {props.children}
        </TaskContext.Provider >
    )
}

export default TaskProvider
