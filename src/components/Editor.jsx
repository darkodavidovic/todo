import { useContext } from 'react'
import "styles/Editor.scss"
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ReactHtmlParser from "react-html-parser"
import { EditorContext } from 'providers/EditorProvider';
import useTaskManager from 'hooks/useTaskManager';
import uniqid from "uniqid"

function Editor() {

    const { taskManager } = useTaskManager()

    // all form data are here
    const { editorOpen, editForm, setEditform, editMode } = useContext(EditorContext)

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

    const saveTask = (e) => {

        e.preventDefault()

        // if edit mode is turned on, task object will be sent to modification, otherwise, Manager will handle new insertion
        editMode && taskManager(editForm, "update")
        !editMode && taskManager({ ...editForm, taskID: uniqid() }, "addNew")
    }

    if (editorOpen) {
        return (
            <div className="Editor" onSubmit={saveTask}>
                <form>

                    <label>Task Title</label>
                    <input type="text" name="taskTitle" onChange={formHanlder} value={editForm.taskTitle} />

                    <label>Task Category</label>
                    <select name="taskCategory" onChange={formHanlder} value={editForm.taskCategory}>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>

                    <label>Task Created At</label>
                    <input type="datetime-local" name="taskCreatedAt" onChange={formHanlder} value={editForm.taskCreatedAt} />

                    <label>Task should be done at least</label>
                    <input type="datetime-local" name="taskShouldBeDoneIn" onChange={formHanlder} value={editForm.taskShouldBeDoneIn} />

                    <label>Task Time Used</label>
                    <input type="text" name="taskTimeUsed" onChange={formHanlder} value={editForm.taskTimeUsed} />

                    <label>Time spended on task</label>
                    <input type="text" name="taskTimeSpended" onChange={formHanlder} value={editForm.taskTimeSpended} />

                    <label>Ramaining time</label>
                    <input type="text" name="taskTimeRemains" onChange={formHanlder} value={editForm.taskTimeRemains} />

                    <label>Task Priority</label>
                    <input type="text" name="taskPriority" onChange={formHanlder} value={editForm.taskPriority} />

                    <label>Task status</label>
                    <select name="taskStatus" onChange={formHanlder} value={editForm.taskStatus}>
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="complete">Complete</option>
                    </select>

                    <label>Task Assigned To</label>
                    <input type="text" name="taskAsignedTo" onChange={formHanlder} value={editForm.taskAsignedTo} />

                    <label>Task Description</label>
                    <CKEditor editor={ClassicEditor} onChange={handleCKEditor} data={""} disabled={false} />

                    {!editMode ?
                        <button type="submit">Add Task</button>
                        :
                        <button type="submit">Update Task</button>
                    }
                </form>


                {/* <span>
                {ReactHtmlParser(inputDataToEdit)}
            </span> */}
            </div>
        )
    }
    
    return (null)
}

export default Editor