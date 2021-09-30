import Editor from 'components/Editor';
import Task from 'components/Task';
import ViewTask from 'components/ViewTask';
import { TaskContext } from 'providers/TaskProvider';
import { useContext, useState } from 'react';
import './App.scss';

function App() {

  const { tasks } = useContext(TaskContext)

  const [viewTask, setViewTask] = useState({})

  return (

    <div className="App">

      <div className="leftBlock">
        <div className="filter">
          filter
        </div>

        <div className="task-list">
          <p>Tasks</p>
          {tasks.map(task => (
            <Task key={task.taskID} task={task} />
          ))}
          <hr />
        </div>
      </div>


      <ViewTask />
      <Editor />

    </div>
  );
}

export default App;
