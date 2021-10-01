import { useState, createContext, useRef } from 'react'

export const EditorContext = createContext()

function EditorProvider(props) {

    const [editorOpen, setEditorOpen] = useState(false)

    const [editMode, setEditMode] = useState(false)

    const initialState = useRef({
        // taskID: "ku77ho3c",
        taskTitle: "random",
        taskCategory: "category",
        taskCreatedAt: "",
        taskShouldBeDoneIn: "",
        taskTimeSpended: "",
        taskPriority: "",
        taskStatus: "",
        taskDescription: "",
        taskAsignedTo: "Darko"
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
