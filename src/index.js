import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import TaskProvider from 'providers/TaskProvider';
import EditorProvider from 'providers/EditorProvider';

ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
      <EditorProvider>
        <App />
      </EditorProvider>
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

