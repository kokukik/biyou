import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DiagnosisProvider } from './store/DiagnosisContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DiagnosisProvider>
      <App />
    </DiagnosisProvider>
  </React.StrictMode>
);