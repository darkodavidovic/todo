import { useState, createContext } from 'react'

export const ViewTaskContext = createContext()

function ViewTaskProvider(props) {

    const [viewMode, setViewMode] = useState(false)

    const [viewTask, setViewTask] = useState({})

    return (
        <ViewTaskContext.Provider value={{ viewTask, setViewTask, viewMode, setViewMode }}>
            {props.children}
        </ViewTaskContext.Provider >
    )
}

export default ViewTaskProvider
