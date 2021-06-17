import { useContext } from 'react';

import Event from './Event';
import AppContext from '../context/AppContext';

const Events = (props) => {
  const { state, dispatch } = props;
  const value = useContext(AppContext);

  return (
    <>
      <div>{value}</div>
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
    </>
  );
};

export default Events;
