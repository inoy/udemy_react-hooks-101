import { useState, useContext } from 'react';

import { CREATE_EVENT, DELETE_ALL_EVENTS } from '../actions';
import AppContext from '../context/AppContext';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { state, dispatch } = useContext(AppContext);

  const addEvent = (e) => {
    e.preventDefault();
    dispatch({ type: CREATE_EVENT, title: title, body: body });
    setTitle('');
    setBody('');
  };

  const deleteAllEvents = (e) => {
    e.preventDefault();
    if (!window.confirm('すべてのイベントを本当に削除しても良いですか？'))
      return;
    dispatch({ type: DELETE_ALL_EVENTS });
  };

  return (
    <>
      <h4>イベント作成フォーム</h4>
      <form>
        <div className='form-group'>
          <label htmlFor='formEventTitle'>タイトル</label>
          <input
            className='form-control'
            id='formEventTitle'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='formEventBody'>ボディー</label>
          <textarea
            className='form-control'
            id='formEventBody'
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
          disabled={state.events.length === 0}
        >
          すべてのイベントを削除する
        </button>
      </form>
    </>
  );
};

export default EventForm;
