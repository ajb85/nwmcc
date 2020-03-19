import { setUsers } from 'reducers/chats.js';
import store from 'store.js';

export default userlist => {
  store.dispatch(setUsers(userlist));
};
