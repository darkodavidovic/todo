import useTaskManager from 'hooks/useTaskManager'
import { EditorContext } from 'providers/EditorProvider'
import { ViewTaskContext } from 'providers/ViewTaskProvider'
import ReactHtmlParser from "react-html-parser"
import { useContext } from 'react'
import 'styles/ViewTask.scss';

import { nowToDatetimeLocal, remainingTimeBetweenNowAndDate } from 'helpers/dates'

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

    const timestampDefference = () => {
        return remainingTimeBetweenNowAndDate(taskShouldBeDoneIn)
    }

    if (viewMode) {
        return (
            <div className="ViewTask">
                <span>{taskID}</span>
                <span>{taskTitle}</span>
                <span>{taskCategory}</span>
                <span>created at: {taskCreatedAt}</span>
                <span>time remaining: {timestampDefference()}</span>
                <div className="view-task-description">{ReactHtmlParser(taskDescription)}</div>
                <button onClick={modifyTask}>modify</button>
                <button onClick={deleteTask}>delete</button>
                <button onClick={timestampDefference}>remains</button>
            </div>
        )
    }

    return (null)
}

export default ViewTask
