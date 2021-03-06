import Editor from 'components/Editor';
import Filter from 'components/Filter';
import Overview from 'components/Overview';
import Task from 'components/Task';
import ToastContainer from 'components/ToastContainer';
import ViewTask from 'components/ViewTask';
import { EditorContext } from 'providers/EditorProvider';
import { TaskContext } from 'providers/TaskProvider';
import { useContext, useState } from 'react';
import './App.scss';

function App() {

  const { tasks } = useContext(TaskContext)

  const { setEditMode, setEditorOpen, setEditform } = useContext(EditorContext)

  const [filtered, setFiltered] = useState([])

  return (

    <div className="App">

      <div className="left-block">

        <Filter toFilter={tasks} filtered={setFiltered} />

        <div className="task-list">

          <div className="task-column">
            <p>New Tasks</p>
            {filtered.filter(task => task.taskStatus === "new").map(task => (
              <Task key={task.taskID} task={task} />
            ))}
          </div>

          <div className="task-column">
            <p>Tasks In Progress</p>
            {filtered.filter(task => task.taskStatus === "in_progress").map(task => (
              <Task key={task.taskID} task={task} />
            ))}
          </div>

          <div className="task-column">
            <p>Completed Tasks</p>
            {filtered.filter(task => task.taskStatus === "complete").map(task => (
              <Task key={task.taskID} task={task} />
            ))}
          </div>
        </div>

        <Overview />

      </div>

      <div className="right-block">
        <ViewTask />
        <Editor />
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
