import { messageList } from '../initialData';
import { IMessageItem } from '.';

const messageListReducer = (state = messageList, action): Array<IMessageItem> => {
  switch (action.type) {
    case 'SELECT_MESSAGE_ITEM':
      return [...action.payload_list];
      break;
    case 'GET_INITIAL_ITEM':
      return [...action.payload_list];
      break;
    case 'DELETE_MESSAGE_ITEM':
      return [...action.payload_list];
      break;
    case 'SWITCH_MALE_FEMALE':
      return [...action.payload_list];
      break;
    case 'SEND_MESSAGE':
      return [...action.payload_list];
    case 'SEND_WINK':
      return [...action.payload_list];
      break;
  }
  return state;
};

export default messageListReducer;
