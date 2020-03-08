import { messageList } from '../initialData';
import { IMessageItem } from '.';

const messageItem = messageList.filter(ele => ele.isActive)[0];

const messageItemReducer = (state = messageItem, action): IMessageItem => {
  switch (action.type) {
    case 'SELECT_MESSAGE_ITEM':
      return action.payload_item;
    case 'GET_INITIAL_ITEM':
      return action.payload_item;
    case 'DELETE_MESSAGE_ITEM':
      return action.payload_item;
    case 'SEND_WINK':
      return action.payload_item;
    case 'SWITCH_MALE_FEMALE':
      return action.payload_item;
    default:
      return state;
  }
};

export default messageItemReducer;
