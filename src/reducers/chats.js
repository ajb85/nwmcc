import axios from 'axios';

const initialState = {
  rooms: {},
  messages: {},
  limit: null,
  activeChat: 1
};

const SET_CHATS = 'CHATS/SAVE';
const SET_MESSAGES = 'CHATS/MESSAGES/SAVE';
const NEW_MESSAGE = 'CHATS/MESSAGES/NEW';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHATS:
      return {
        ...state,
        rooms: action.payload.reduce((acc, c) => {
          acc[c.id] = c;
          return acc;
        }, {})
      };
    case SET_MESSAGES:
      const { chat_id } = action.payload;
      return {
        ...state,
        limit: action.payload.limit,
        messages: { ...state.messages, [chat_id]: action.payload.messages }
      };
    case NEW_MESSAGE:
      const room_id = action.payload.chat_id;
      const newMessages = {
        ...state.messages,
        [room_id]: [
          action.payload,
          ...state.messages[room_id].slice(0, state.limit - 1 || 49)
        ]
      };
      return {
        ...state,
        messages: newMessages
      };
    default:
      return state;
  }
};

export const fetchMessages = chat_id => dispatch => {
  axios.get(`/chats/${chat_id}/messages`).then(res => {
    if (res) {
      console.log('MSGS: ', res.data);
      dispatch({
        type: SET_MESSAGES,
        payload: { ...res.data, chat_id }
      });
    }
  });
};

export const addMessage = message => ({ type: NEW_MESSAGE, payload: message });

export const populateChats = () => dispatch => {
  axios.get('/chats/byUser').then(res => {
    if (res) {
      dispatch({ type: SET_CHATS, payload: res.data });
    }
  });
};
