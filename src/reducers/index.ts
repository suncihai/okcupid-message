import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';
import counterReducer from './counter';
import isMaleReducer from './isMale';
import messageListReducer from './messageList';
import messageItemReducer from './messageItem';
import messageChatReducer from './messageChat';
import chatMapReducer from './chatMap';

const rootReducer = combineReducers({
  count: counterReducer,
  isMale: isMaleReducer,
  messageList: messageListReducer,
  messageItem: messageItemReducer,
  messageChat: messageChatReducer,
  chatMap: chatMapReducer
});

export interface State {
  count: number;
  router: RouterState;
}

export interface IMessageItem {
  messageId: string;
  messagerName: string;
  address: string;
  age: string;
  hobby: string;
  race: string;
  match: number;
  messages: number;
  avatar: string;
  isMale: boolean;
  isAList: boolean;
  isWinked: boolean;
  isRead: boolean;
  isActive: boolean;
}

export interface IChat {
  chatList: Map<string, Array<IChatItem>>;
}

//since it is hard code, avatar depend on if user is man or not instead of url
export interface IChatItem {
  message: string;
  timestamp: number;
  isUser: boolean;
}

export default rootReducer;
