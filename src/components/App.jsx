import React, { useReducer, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import AppContext from '../context/AppContext';
import EventForm from './EventForm';
import Events from './Events';
import OperationLogs from './OperationLogs';
import reducer from '../reducers';

const APP_KEY = 'appWithRedux';

const appState = localStorage.getItem(APP_KEY);

const App = () => {
  const initialState = JSON.parse(appState) || {
    events: [],
    operationLogs: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className='container-fluid'>
        <EventForm />
        <Events />
        <OperationLogs />
      </div>
    </AppContext.Provider>
  );
};

export default App;
