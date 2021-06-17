import { useContext } from 'react';

import { DELETE_EVENT, ADD_OPERATION_LOG } from '../actions';
import AppContext from '../context/AppContext';
import { timeCurrentIso8601 } from '../utils';

const Event = ({ event }) => {
  const { dispatch } = useContext(AppContext);

  const id = event.id;
  const handleClickDeleteButton = (e) => {
    if (!window.confirm(`イベント（id = ${id}）を本当に削除しても良いですか？`))
      return;
    dispatch({ type: DELETE_EVENT, id });
    dispatch({
      type: ADD_OPERATION_LOG,
      description: `イベント（id = ${id}）を削除しました。`,
      operated_at: timeCurrentIso8601(),
    });
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{event.title}</td>
      <td>{event.body}</td>
      <td>
        <button className='btn btn-danger' onClick={handleClickDeleteButton}>
          削除
        </button>
      </td>
    </tr>
  );
};

export default Event;
