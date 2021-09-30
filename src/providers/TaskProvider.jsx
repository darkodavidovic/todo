import { useState, createContext } from 'react'

export const TaskContext = createContext()

function TaskProvider(props) {

    const [tasks, setTasks] = useState([])

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {props.children}
        </TaskContext.Provider >
    )
}

export default TaskProvider
