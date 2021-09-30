import React from 'react'
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


    return (
        <div className="Task">
            <span>{taskID}</span>
        </div>
    )
}

export default Task
