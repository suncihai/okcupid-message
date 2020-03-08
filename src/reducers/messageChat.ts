import { messageList, chatMap } from '../initialData';
import { IChatItem } from '.';
import Cookie from 'js-cookie';

let messageId: string = '';
if (Cookie.get('okcupidMessageItem')) {
  messageId = Cookie.get('okcupidMessageItem');
} else {
  messageId = messageList.filter(ele => ele.isActive)[0].messageId;
}
const chatList: Array<IChatItem> = chatMap.get(messageId);

const messageChatReducer = (state = chatList, action): Array<IChatItem> => {
  switch (action.type) {
    case 'SELECT_MESSAGE_ITEM':
      return [...chatMap.get(action.payload_item.messageId)];
    case 'DELETE_MESSAGE_ITEM':
      return [...action.payload];
    case 'SEND_MESSAGE':
      return [...action.payload_chatList];
    case 'SWITCH_MALE_FEMALE':
      return [...action.payload_chat];
    default:
      return state;
  }
};

export default messageChatReducer;
