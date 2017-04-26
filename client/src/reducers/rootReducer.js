import { combineReducers } from 'redux';

import flashMessages from './flashMessagesReducer';
import auth from './authReducer';

export default combineReducers({
  flashMessages,
  auth,
});