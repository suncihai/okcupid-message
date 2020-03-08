import { IMessageItem, IChatItem } from './reducers/index';

export const messageList: Array<IMessageItem> = [
  {
    messageId: 'OKC001', //indicates okcupid message id
    messagerName: 'Ruben', //messager's name
    address: 'Manhattan, NY', //messager's address
    age: '26',
    hobby: 'Cooking',
    race: 'White',
    match: 78,
    messages: 4,
    avatar: 'male', //in real case would be a img url path
    isMale: true,
    isAList: true, //if message is A-List
    isWinked: false, //if winked to him/her
    isRead: false, //if this msg already read
    isActive: false //if this msg box is selected
  },
  {
    messageId: 'OKC002',
    messagerName: 'Brian',
    address: 'Queens, NY',
    age: '30',
    hobby: 'Diving, Fishing',
    race: 'Asian',
    match: 88,
    messages: 8,
    avatar: 'male',
    isMale: true,
    isAList: false,
    isWinked: false,
    isRead: false,
    isActive: false
  },
  {
    messageId: 'OKC003',
    messagerName: 'Mike',
    address: 'Jersey City, NJ',
    age: '19',
    hobby: 'Eating',
    race: 'Latino',
    match: 92,
    messages: 23,
    avatar: 'male',
    isMale: true,
    isAList: true,
    isWinked: false,
    isRead: true,
    isActive: true
  },
  {
    messageId: 'OKC004',
    messagerName: 'Joel',
    address: 'Brooklyn, NY',
    age: '28',
    hobby: 'Travelling',
    race: 'African',
    match: 69,
    messages: 14,
    avatar: 'male',
    isMale: true,
    isAList: false,
    isWinked: false,
    isRead: true,
    isActive: false
  },
  {
    messageId: 'OKC005',
    messagerName: 'Mary',
    address: 'Bronx, NY',
    age: '30',
    hobby: 'Reading Novels',
    race: 'White',
    match: 83,
    messages: 6,
    avatar: 'female',
    isMale: false,
    isAList: false,
    isWinked: false,
    isRead: true,
    isActive: false
  },
  {
    messageId: 'OKC006',
    messagerName: 'Rose',
    address: 'Fort Lee, NJ',
    age: '20',
    hobby: 'Video Games',
    race: 'Asian',
    match: 94,
    messages: 85,
    avatar: 'female',
    isMale: false,
    isAList: true,
    isWinked: false,
    isRead: false,
    isActive: false
  },
  {
    messageId: 'OKC007',
    messagerName: 'Linda',
    address: 'Edison, NJ',
    age: '29',
    hobby: 'Swimming',
    race: 'Latino',
    match: 57,
    messages: 28,
    avatar: 'female',
    isMale: false,
    isAList: true,
    isWinked: false,
    isRead: false,
    isActive: false
  }
];

export const chatList1: Array<IChatItem> = [
  {
    message: 'Hi, You are so hot',
    timestamp: 1583065114000,
    isUser: false
  },
  {
    message: 'www, you look good!',
    timestamp: 1583075114000,
    isUser: true
  }
];

export const chatList2: Array<IChatItem> = [
  {
    message: 'hello',
    timestamp: 1583085114000,
    isUser: false
  },
  {
    message: `What's up?`,
    timestamp: 1583090114000,
    isUser: true
  },
  {
    message: 'Are you looking for hook-up?',
    timestamp: 1583091114000,
    isUser: false
  }
];

export const chatList3: Array<IChatItem> = [
  {
    message: 'Hi, I live close to you!',
    timestamp: 1583091434000,
    isUser: false
  },
  {
    message: 'Sounds good!',
    timestamp: 1583092514000,
    isUser: true
  },
  {
    message: 'You wanna a dink?',
    timestamp: 1583093714000,
    isUser: false
  },
  {
    message:
      'Kk, which bar do you often go to?',
    timestamp: 1583094124000,
    isUser: false
  }
];

export const chatList4: Array<IChatItem> = [
  {
    message: 'Hey honey',
    timestamp: 1583067814000,
    isUser: false
  }
];

export const chatList5: Array<IChatItem> = [
  {
    message: 'You look really tall!',
    timestamp: 1583067344000,
    isUser: false
  },
  {
    message: 'Yep!!!',
    timestamp: 1583067714000,
    isUser: true
  }
];

export const chatList6: Array<IChatItem> = [
  {
    message:
      'Hye, buddy, what type are you looking for?',
    timestamp: 1583034344000,
    isUser: false
  },
  {
    message: 'Any will do',
    timestamp: 1583057714000,
    isUser: true
  }
];

export const chatList7: Array<IChatItem> = [
  {
    message: 'Helloooooo, are you there?',
    timestamp: 1583039344000,
    isUser: true
  },
  {
    message: 'Are you interested in me?',
    timestamp: 1583046344000,
    isUser: false
  }
];

export const chatMap: Map<string, Array<IChatItem>> = new Map();
chatMap.set('OKC001', chatList1);
chatMap.set('OKC002', chatList2);
chatMap.set('OKC003', chatList3);
chatMap.set('OKC004', chatList4);
chatMap.set('OKC005', chatList5);
chatMap.set('OKC006', chatList6);
chatMap.set('OKC007', chatList7);
