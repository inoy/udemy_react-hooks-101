import { ADD_OPERATION_LOG, DELETE_ALL_OPERATION_LOGS } from '../actions';

const operationLogs = (state = [], action) => {
  switch (action.type) {
    case ADD_OPERATION_LOG:
      return [
        { description: action.description, operated_at: action.operated_at },
        ...state,
      ];
    case DELETE_ALL_OPERATION_LOGS:
      return [];
    default:
      return state;
  }
};

export default operationLogs;
