import { useContext } from 'react'
import "styles/Editor.scss"
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { EditorContext } from 'providers/EditorProvider';
import useTaskManager from 'hooks/useTaskManager';
import uniqid from "uniqid"
import { nowToDatetimeLocal } from 'helpers/dates';
import useToaster from 'hooks/useToaster';

function Editor() {

    const { taskManager } = useTaskManager()
    const { showToast } = useToaster()

    // all form data are here
    const { editorOpen, setEditorOpen, editForm, setEditform, editMode, setEditMode, resetState } = useContext(EditorContext)

    // this will handle all inputs by targeting them once you start typing inside
    const formHanlder = (e) => {
        const name = e.target.name
        const value = e.target.value
        setEditform(prev => ({ ...prev, [name]: value }))
    }

    // this will handle CKEditor input string only
    const handleCKEditor = (e, editor) => {
        setEditform(prev => ({ ...prev, taskDescription: editor.getData() }))
    }

    // colose editor
    const cancelAndClose = () => {
        resetState()
        setEditMode(false)
        setEditorOpen(false)
    }

    // submit form
    const saveTask = (e) => {
        e.preventDefault()

        if (editForm.taskTitle.length < 5) {
            showToast({ type: "error", title: "Task title not valid. ", message: "You need minimum 5 characters", position: "top-center", expire: 3 })
            return
        }

        if (editForm.taskCategory.length < 3) {
            showToast({ type: "error", title: "Task category is valid. ", message: "You need minimum 3 characters", position: "top-center", expire: 3 })
            return
        }

        if (editForm.taskCreatedAt.length < 3) {
            showToast({ type: "error", message: "Creation date not selected.", position: "top-center", expire: 3 })
            return
        }

        if (editForm.taskShouldBeDoneIn.length < 3) {
            showToast({ type: "error", message: "Task expecting time not selected.", position: "top-center", expire: 3 })
            return
        }

        if (editForm.taskPriority === "") {
            showToast({ type: "error", message: "Task Priority not selected.", position: "top-center", expire: 3 })
            return
        }

        if (editForm.taskStatus === "") {
            showToast({ type: "error", message: "Task Status not selected.", position: "top-center", expire: 3 })
            return
        }

        if (editForm.taskAsignedTo === "") {
            showToast({ type: "error", message: "Select person for this task.", position: "top-center", expire: 3 })
            return
        }

        if (editForm.taskDescription < 100) {
            showToast({ type: "error", title: "Task description not valid. ", message: "You need minimum 100 characters", position: "top-center", expire: 3 })
            return
        }

        // if edit mode is turned on, task object will be sent to modification, otherwise, Manager will handle new insertion
        if (editMode) {
            taskManager({ ...editForm, taskTimeSpended: editForm.taskStatus === "complete" ? nowToDatetimeLocal() : false }, "update")
            showToast({ type: "success", message: "Taski successfully updated.", position: "top-center", expire: 3 })
            resetState()
        }

        if (!editMode) {
            taskManager({ ...editForm, taskID: uniqid() }, "addNew")
            showToast({ type: "success", message: "New task successfully added.", position: "top-center", expire: 3 })
            resetState()
        }
    }

    if (editorOpen) {
        return (
            <div className="Editor">

                <form onSubmit={saveTask}>

                    {!editMode ?
                        <h1>New Task</h1>
                        :
                        <h1>Modify Task</h1>
                    }

                    <label>Task Title</label>
                    <input type="text" name="taskTitle" onChange={formHanlder} value={editForm.taskTitle} />

                    <label>Task Category</label>
                    <input type="text" name="taskCategory" onChange={formHanlder} value={editForm.taskCategory} />

                    <label>Task Created At</label>
                    <input type="datetime-local" name="taskCreatedAt" onChange={formHanlder} value={editForm.taskCreatedAt} />

                    <label>Task should be done at least</label>
                    <input type="datetime-local" name="taskShouldBeDoneIn" onChange={formHanlder} value={editForm.taskShouldBeDoneIn} />

                    {/* <label>Time spended on task</label>
                    <input type="text" name="taskTimeSpended" onChange={formHanlder} value={editForm.taskTimeSpended} /> */}

                    {/* <label>Ramaining time</label>
                    <input type="text" name="taskTimeRemains" onChange={formHanlder} value={editForm.taskTimeRemains} /> */}

                    <label>Task Priority</label>
                    <select name="taskPriority" onChange={formHanlder} value={editForm.taskPriority}>
                        <option value="">Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>

                    <label>Task status</label>
                    <select name="taskStatus" onChange={formHanlder} value={editForm.taskStatus}>
                        <option value="">Select Status</option>
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="complete">Complete</option>
                    </select>

                    <label>Task Assigned To</label>
                    <input type="text" name="taskAsignedTo" onChange={formHanlder} value={editForm.taskAsignedTo} />

                    <label>Task Description</label>
                    <CKEditor editor={ClassicEditor} onChange={handleCKEditor} data={editForm.taskDescription} disabled={false} />

                    {!editMode ?
                        <button type="submit">Add New Task</button>
                        :
                        <button type="submit">Update Task</button>
                    }
                    <button className="close-editor" onClick={cancelAndClose}>cancel and close</button>
                </form>


            </div>
        )
    }

    return (null)
}

export default Editor