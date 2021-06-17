import Event from './Event';

const Events = (props) => {
  const { state, dispatch } = props;

  return (
    <>
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
