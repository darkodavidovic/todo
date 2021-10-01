import useTaskManager from 'hooks/useTaskManager'
import { EditorContext } from 'providers/EditorProvider'
import { ViewTaskContext } from 'providers/ViewTaskProvider'
import ReactHtmlParser from "react-html-parser"
import { useContext } from 'react'
import 'styles/ViewTask.scss';

import { remainingTimeBetweenNowAndDate, remainingTimeBetweenTwoDates, timeAndDateFormated } from 'helpers/dates'

function ViewTask() {

    const { viewTask, setViewTask, viewMode, setViewMode } = useContext(ViewTaskContext)

    const {
        taskID,
        taskTitle,
        taskCategory,
        taskCreatedAt,
        taskShouldBeDoneIn,
        taskTimeSpended,
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
        setViewMode(false)
        setViewTask({})
    }

    const closeView = () => {
        setViewTask({})
        setViewMode(false)
    }

    const { taskManager } = useTaskManager()

    const deleteTask = () => {
        taskManager(viewTask, "delete")
        setViewMode(false)
    }

    const spendedTime = () => {
        if (taskTimeSpended) {
            return remainingTimeBetweenTwoDates(taskTimeSpended, taskCreatedAt)
        }
        return "Not Available"
    }


    if (viewMode) {
        return (
            <div className="ViewTask">

                <h1>Task View</h1>

                <div className="details">
                    <span className="c-t">Task ID</span><span className="c-d">{taskID}</span>
                    <span className="c-t">Title</span><span className="c-d">{taskTitle}</span>
                    <span className="c-t">Category</span><span className="c-d">{taskCategory}</span>
                    <span className="c-t">Created at</span><span className="c-d">{timeAndDateFormated(taskCreatedAt)}</span>
                    <span className="c-t">Remaining Time</span><span className="c-d">{remainingTimeBetweenNowAndDate(taskShouldBeDoneIn)}</span>
                    <span className="c-t">Time used on task</span><span className="c-d">{spendedTime()}</span>
                    <span className="c-t">Priority</span><span className="c-d upper-case">{taskPriority}</span>
                    <span className="c-t">Status</span><span className="c-d upper-case">{taskStatus?.split("_").join(" ")}</span>
                    <span className="c-t">Asigned To</span><span className="c-d">{taskAsignedTo}</span>
                </div>

                <h1>Task Descrtiption</h1>
                <hr />

                <div className="view-task-description">{ReactHtmlParser(taskDescription)}</div>

                <hr />

                <div className="view-command-buttons">
                    <button onClick={modifyTask}>modify</button>
                    <button onClick={deleteTask}>delete</button>
                    <button onClick={closeView}>close</button>
                </div>

            </div>
        )
    }

    return (null)
}

export default ViewTask
