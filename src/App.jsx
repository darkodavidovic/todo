import Editor from 'components/Editor';
import Filter from 'components/Filter';
import Overview from 'components/Overview';
import Task from 'components/Task';
import ViewTask from 'components/ViewTask';
import { TaskContext } from 'providers/TaskProvider';
import { useContext, useState } from 'react';
import './App.scss';

function App() {

  const { tasks } = useContext(TaskContext)

  const [filtered, setFiltered] = useState([])

  return (

    <div className="App">

      <div className="left-block">

        <Filter toFilter={tasks} filtered={setFiltered} />

        <div className="task-list">
          <p>Tasks</p>
          {filtered.map(task => (
            <Task key={task.taskID} task={task} />
          ))}
          <hr />
        </div>

        <Overview />

      </div>

      <div className="right-block">
        <ViewTask />
        <Editor />
      </div>


    </div>
  );
}

export default App;
