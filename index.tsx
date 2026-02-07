import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Fix for "Could not create web worker(s)" in some environments
// @ts-ignore
window.MonacoEnvironment = {
  getWorkerUrl: () => ''
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);