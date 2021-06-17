// action = {
//   type: 'CREATE_EVENT',
//   title: 'タイトル1',
//   body: 'ボディー1',
// };
// state = [
//   { id: 1, title: 'タイトル1', body: 'ボディー1' },
//   { id: 2, title: 'タイトル2', body: 'ボディー2' },
// ];
const newId = (state) => {
  const length = state.length;
  if (length === 0) {
    return 1;
  } else {
    return state[length - 1].id++;
  }
};

const events = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_EVENT':
      console.log({ action });
      const event = { title: action.title, body: action.body };
      return [...state, { ...event, id: newId(state) }];
    case 'DELETE_EVENT':
    case 'DELETE_ALL_EVENTS':
      return [];
    default:
      return state;
  }
};

export default events;
