import { IMessageItem, IChatItem } from '../reducers';
import Cookie from 'js-cookie';
import { history } from '../index';

export const selectMessageItem = (
  messageId: string,
  isMale: boolean,
  messageList: Array<IMessageItem>
): {
  type: string;
  payload_list: Array<IMessageItem>;
  payload_item: object;
} => {
  let messageItem = {};
  messageList.forEach(ele => {
    ele.isActive = false;
  });
  messageList.forEach(ele => {
    if (ele.messageId === messageId) {
      ele.isActive = true;
      ele.isRead = true;
      Cookie.set('okcupidMessageItem', messageId);
      messageItem = Object.assign({}, ele);
    }
  });
  history.push(`/message/${isMale ? 'women' : 'men'}/${messageId}`);
  return {
    type: 'SELECT_MESSAGE_ITEM',
    payload_list: messageList,
    payload_item: messageItem
  };
};

//reload from cached item
export const getInitialItem = (
  messageList: Array<IMessageItem>
): {
  type: string;
  payload_list: Array<IMessageItem>;
  payload_item: object;
} => {
  let messageItem = {};
  if (Cookie.get('okcupidMessageItem')) {
    messageList.forEach(ele => {
      ele.isActive = false;
    });
    messageList.forEach(ele => {
      if (ele.messageId === Cookie.get('okcupidMessageItem')) {
        ele.isActive = true;
        ele.isRead = true;
        messageItem = Object.assign({}, ele);
      }
    });
  } else {
    messageList.forEach(ele => {
      if (ele.isActive) {
        messageItem = Object.assign({}, ele);
        Cookie.set('okcupidMessageItem', ele.messageId);
      }
    });
  }

  return {
    type: 'GET_INITIAL_ITEM',
    payload_list: messageList,
    payload_item: messageItem
  };
};

export const deleteMessageItem = (
  messageId: string,
  messageList: Array<IMessageItem>,
  chatMap: Map<string, Array<IChatItem>>
): {
  type: string;
  payload_list: Array<IMessageItem>;
  payload_map: Map<string, Array<IChatItem>>;
  payload_item: object;
  payload: Array<IChatItem>;
} => {
  let target = 0;
  messageList.forEach((ele, index) => {
    if (ele.messageId === messageId) {
      target = index;
      let chatList: Array<IChatItem> = new Array();
      chatMap.set(messageId, [...chatList]);
    }
  });
  messageList.splice(target, 1); //remove that message
  return {
    type: 'DELETE_MESSAGE_ITEM',
    payload_list: messageList,
    payload_map: chatMap,
    payload_item: Object.assign({}, {}),
    payload: []
  };
};

export const sendMsg = (
  messageId: string,
  messageItem: IMessageItem,
  messageList: Array<IMessageItem>,
  message: string,
  timestamp: number,
  isUser: boolean,
  chatMap: Map<string, Array<IChatItem>>
): {
  type: string;
  payload_map: Map<string, Array<IChatItem>>;
  payload_list: Array<IMessageItem>;
  payload_chatList: Array<IChatItem>;
} => {
  let chatList: Array<IChatItem> = [];
  let chatItem: IChatItem = { message, timestamp, isUser };
  //if sender is not current selected messageItem's sender, that message notification should turn green
  //if sender is just current selected messageItem's sender, no need to turn green
  if (messageId !== messageItem.messageId) {
    messageList.forEach(ele => {
      if (ele.messageId === messageId) {
        ele.isRead = false;
      }
    });
    chatList = chatMap.get(messageId);
    chatList.push(chatItem);
    chatMap.set(messageId, [...chatList]);
    chatList = chatMap.get(messageItem.messageId); //little tricky here, keep current item's chat list
  } else {
    chatList = chatMap.get(messageItem.messageId);
    chatList.push(chatItem);
    chatMap.set(messageId, [...chatList]);
  }

  return {
    type: 'SEND_MESSAGE',
    payload_map: chatMap,
    payload_list: messageList,
    payload_chatList: chatList
  };
};

export const sendWink = (
  messageId: string,
  messageList: Array<IMessageItem>
): {
  type: string;
  payload_list: Array<IMessageItem>;
  payload_item: object;
} => {
  let messageItem = {};
  messageList.forEach(ele => {
    if (ele.messageId === messageId) {
      ele.isWinked = true;
      ele.messages++; //this message is done, so messages should plus 1
      messageItem = Object.assign({}, ele);
    }
  });
  return {
    type: 'SEND_WINK',
    payload_list: messageList,
    payload_item: messageItem
  };
};

export const switchBuySell = (
  isMale: boolean,
  messageList: Array<IMessageItem>
): {
  type: string;
  payload: boolean;
  payload_list: Array<IMessageItem>;
  payload_item: object;
  payload_chat: Array<IChatItem>;
} => {
  Cookie.set('isOkcupidMale', !isMale);
  messageList.forEach(ele => {
    ele.isActive = false;
  });
  history.push(`/message/${!isMale ? 'women' : 'men'}`);
  return {
    type: 'SWITCH_MALE_FEMALE',
    payload: !isMale,
    payload_list: messageList,
    payload_item: Object.assign({}, {}),
    payload_chat: []
  };
};
