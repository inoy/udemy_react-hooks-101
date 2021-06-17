import React, { useState, useReducer } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Event from './Event';
import reducer from '../reducers';

const App = (props) => {
  const [event, setEvent] = useState(props);
  const { title, body } = event;
  const [state, dispatch] = useReducer(reducer, []);

  const addEvent = (e) => {
    e.preventDefault();
    dispatch({ type: 'CREATE_EVENT', title: title, body: body });
    setEvent(props);
  };

  const deleteAllEvents = (e) => {
    e.preventDefault();
    if (!window.confirm('すべてのイベントを本当に削除しても良いですか？'))
      return;
    dispatch({ type: 'DELETE_ALL_EVENTS' });
  };

  return (
    <div className='container-fluid'>
      <h4>イベント作成フォーム</h4>
      <form>
        <div className='form-group'>
          <label htmlFor='formEventTitle'>タイトル</label>
          <input
            className='form-control'
            id='formEventTitle'
            value={title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='formEventBody'>ボディー</label>
          <textarea
            className='form-control'
            id='formEventBody'
            value={body}
            onChange={(e) => setEvent({ ...event, body: e.target.value })}
          />
        </div>

        <button
          className='btn btn-primary'
          onClick={addEvent}
          disabled={title === '' || body === ''}
        >
          イベントを作成する
        </button>
        <button
          className='btn btn-danger'
          onClick={deleteAllEvents}
          disabled={state.length === 0}
        >
          すべてのイベントを削除する
        </button>
      </form>

      <h4>イベント一覧</h4>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>ボディー</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.map((event) => (
            <Event key={event.id} event={event} dispatch={dispatch} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

App.defaultProps = {
  title: '',
  body: '',
};

export default App;
