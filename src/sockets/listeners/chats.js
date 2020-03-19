import { addMessage } from 'reducers/chats.js';
import store from 'store.js';

export default {
  newMessage: function(message) {
    store.dispatch(addMessage(message));
  }
};
