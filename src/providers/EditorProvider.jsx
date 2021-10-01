import { useState, createContext, useRef } from 'react'

export const EditorContext = createContext()

function EditorProvider(props) {

    const [editorOpen, setEditorOpen] = useState(true)

    const [editMode, setEditMode] = useState(false)

    const initialState = useRef({
        // taskID: "ku77ho3c",
        taskTitle: "",
        taskCategory: "",
        taskCreatedAt: "",
        taskShouldBeDoneIn: "",
        taskTimeSpended: "",
        taskPriority: "",
        taskStatus: "",
        taskDescription: "",
        taskAsignedTo: ""
    })

    const [editForm, setEditform] = useState(initialState.current)

    const resetState = () => {
        setEditform(initialState.current)
    }

    return (
        <EditorContext.Provider value={{ editorOpen, setEditorOpen, editForm, setEditform, editMode, setEditMode, resetState }}>
            {props.children}
        </EditorContext.Provider >
    )
}

export default EditorProvider
