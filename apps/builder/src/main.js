import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
      <App />
  </StrictMode>
);
