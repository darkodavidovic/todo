import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import TaskProvider from 'providers/TaskProvider';
import EditorProvider from 'providers/EditorProvider';
import ViewTaskProvider from 'providers/ViewTaskProvider';

ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
      <EditorProvider>
        <ViewTaskProvider>
          <App />
        </ViewTaskProvider>
      </EditorProvider>
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

