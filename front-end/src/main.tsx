import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App_orderitem';
import './resets.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
