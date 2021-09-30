import { nowToDatetimeLocal } from 'helpers/dates'
import { useState, createContext } from 'react'

export const EditorContext = createContext()

function EditorProvider(props) {

    const [editorOpen, setEditorOpen] = useState(true)

    const [editMode, setEditMode] = useState(false)

    const [editForm, setEditform] = useState({
        // taskID: "ku77ho3c",
        taskTitle: "radnom",
        taskCategory: "",
        taskCreatedAt: nowToDatetimeLocal(),
        taskShouldBeDoneIn: "",
        taskTimeUsed: "",
        taskTimeSpended: "",
        taskTimeRemains: "",
        taskPriority: "",
        taskStatus: "",
        taskDescription: "",
        taskAsignedTo: "Darko"
    })

    return (
        <EditorContext.Provider value={{ editorOpen, setEditorOpen, editForm, setEditform, editMode, setEditMode }}>
            {props.children}
        </EditorContext.Provider >
    )
}

export default EditorProvider
