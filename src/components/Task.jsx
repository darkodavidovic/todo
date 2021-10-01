import { timeAndDateFormated } from 'helpers/dates';
import { EditorContext } from 'providers/EditorProvider';
import { ViewTaskContext } from 'providers/ViewTaskProvider';
import { useContext } from 'react'
import 'styles/Task.scss';

function Task({ task }) {
    const {
        // taskID,
        taskTitle,
        // taskCategory,
        taskCreatedAt,
        // taskShouldBeDoneIn,
        // taskTimeUsed,
        // taskTimeSpended,
        // taskTimeRemains,
        taskPriority,
        taskStatus,
        // taskDescription,
        taskAsignedTo
    } = task

    const { setViewTask, setViewMode } = useContext(ViewTaskContext)
    const { setEditMode, setEditorOpen } = useContext(EditorContext)

    const viewThisTask = () => {
        setViewTask(task)
        setViewMode(true)
        setEditMode(false)
        setEditorOpen(false)
    }

    const styles = {
        high: { backgroundColor: "red" },
        medium: { backgroundColor: "yellow" },
        low: { backgroundColor: "white" }
    }

    return (
        <div className="Task" onClick={viewThisTask} style={styles[task.taskPriority]}>

            <div className="task-row">
                <span>Task Title:</span> <span>{taskTitle}</span>
            </div>

            <div className="task-row">
                <span>Assigned To:</span> <span>{taskAsignedTo}</span>
            </div>

            <div className="task-row">
                <span>Task Priority:</span> <span>{taskPriority}</span>
            </div>

            <div className="task-row">
                <span>Task Status:</span> <span>{taskStatus?.split("_").join(" ")}</span>
            </div>

            <div className="task-row">
                <span>Created At:</span> <span>{timeAndDateFormated(taskCreatedAt)}</span>
            </div>

        </div>
    )
}

export default Task
