import useTaskManager from 'hooks/useTaskManager'
import { EditorContext } from 'providers/EditorProvider'
import { ViewTaskContext } from 'providers/ViewTaskProvider'
import { useContext } from 'react'

function ViewTask() {

    const { viewTask, setViewTask, viewMode, setViewMode } = useContext(ViewTaskContext)

    const {
        taskID,
        taskTitle,
        taskCategory,
        taskCreatedAt,
        taskShouldBeDoneIn,
        taskTimeUsed,
        taskTimeSpended,
        taskTimeRemains,
        taskPriority,
        taskStatus,
        taskDescription,
        taskAsignedTo
    } = viewTask

    const { setEditMode, setEditorOpen, setEditform } = useContext(EditorContext)

    const modifyTask = () => {
        setEditform(viewTask)
        setEditorOpen(true)
        setEditMode(true)
    }

    const { taskManager } = useTaskManager()

    const deleteTask = () => {
        taskManager(viewTask, "delete")
        setViewMode(false)
    }



    if (viewMode) {
        return (
            <div className="ViewTask">
                <span>{taskID}</span>
                <span>{taskTitle}</span>
                <span>{taskCategory}</span>
                <span>{taskCreatedAt}</span>
                <span>{taskShouldBeDoneIn}</span>
                <button onClick={modifyTask}>modify</button>
                <button onClick={deleteTask}>delete</button>
            </div>
        )
    }

    return (null)
}

export default ViewTask
