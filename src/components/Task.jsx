import { ViewTaskContext } from 'providers/ViewTaskProvider';
import { useContext } from 'react'
import 'styles/Task.scss';

function Task({ task }) {
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
    } = task

    const { viewTask, setViewTask, viewMode, setViewMode } = useContext(ViewTaskContext)

    const viewThisTask = () => {
        setViewTask(task)
        setViewMode(true)
    }

    return (
        <div className="Task">
            <span>{taskTitle}</span>
            <span>{taskAsignedTo}</span>
            <span>{taskPriority}</span>
            <button onClick={viewThisTask}>view task</button>
        </div>
    )
}

export default Task
