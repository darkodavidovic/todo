import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import TaskProvider from 'providers/TaskProvider';
import EditorProvider from 'providers/EditorProvider';
import ViewTaskProvider from 'providers/ViewTaskProvider';
import ToasterProvider from 'providers/ToasterProvider';
<ToasterProvider />
ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
      <EditorProvider>
        <ViewTaskProvider>
          <ToasterProvider>
            <App />
          </ToasterProvider>
        </ViewTaskProvider>
      </EditorProvider>
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

