import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

import { App_orderitem } from './App_orderitem';
import { Unnamed } from './components/Status/Status';
import './resets.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);
