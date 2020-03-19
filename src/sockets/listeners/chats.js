import addMessage from 'reducers/chats.js';

export default {
  newMessage: function(message) {
    console.log('THIS: ', this);
    this.store.dispatch(addMessage(message));
  }
};
