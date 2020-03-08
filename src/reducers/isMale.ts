//initial as a female if no cache
import Cookie from 'js-cookie';

let isMale = Cookie.get('isOkcupidMale') === 'true' ? true : false;

const isMaleReducer = (state = isMale, action): boolean => {
  switch (action.type) {
    case 'SWITCH_MALE_FEMALE':
      return action.payload;
    default:
      return state;
  }
};

export default isMaleReducer;
