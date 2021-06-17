import React, { useState, useReducer } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import reducer from '../reducers';

const App = (props) => {
  const [event, setEvent] = useState(props);
  const { title, body } = event;
  const [state, dispatch] = useReducer(reducer, []);

  const addEvent = (e) => {
    e.preventDefault();
    dispatch({ type: 'CREATE_EVENT', title: title, body: body });
    console.log(state);

    setEvent(props);
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

        <button className='btn btn-primary' onClick={addEvent}>
          イベントを作成する
        </button>
        <button className='btn btn-danger'>すべてのイベントを削除する</button>
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
        <tbody></tbody>
      </table>
    </div>
  );
};

App.defaultProps = {
  title: '',
  body: '',
};

export default App;
