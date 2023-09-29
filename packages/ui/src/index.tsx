import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ApiContext } from './hooks/useApi';
import './index.css';
import { UIConfigContext } from './hooks/useUIConfig';
import { Api } from './services/Api';
import './theme.css';
import './toastify.css';

const basePath = ((window as any).__basePath__ =
  document.head.querySelector('base')?.getAttribute('href') || '');
const clientOptions = JSON.parse(document.getElementById('__CLIENT_OPTIONS__')?.textContent || '{}');
const api = new Api({ basePath, clientOptions });
const uiConfig = JSON.parse(document.getElementById('__UI_CONFIG__')?.textContent || '{}');

render(
  <BrowserRouter basename={basePath}>
    <UIConfigContext.Provider value={uiConfig}>
      <ApiContext.Provider value={api}>
        <App />
      </ApiContext.Provider>
    </UIConfigContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
