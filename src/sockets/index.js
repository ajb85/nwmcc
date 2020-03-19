import io from 'socket.io-client';
import listeners from './listeners/';
import defaultListeners from './listeners/defaults/';
import store from 'store.js';
class Socket {
  constructor() {
    this.io = io;
    this.socket = this.io.connect(process.env.REACT_APP_BASEURL, {
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionDelayMax: 50000,
      reconnectionAttempts: Infinity
    });

    // Record of subscriptions in case of disconnect
    this.subscribed = {};

    this.listeners = listeners;
    this.store = store;

    for (let room in defaultListeners) {
      // Listeners that every client should have on
      const callback = defaultListeners[room];
      this._listen(room, callback);
    }

    // Try to identify self on initialization
    this._identify();
  }

  join(room) {
    this._listen(room, (context, message) => {
      this.listeners.chats[context](message);
    });
  }

  emit(room, data) {
    this._identify();
    return this.socket.emit(room, data);
  }

  subscribe(room) {
    this.emit('subscribe', room);
  }

  _listen(room, cb) {
    if (!this.subscribed[room]) {
      this.subscribed[room] = true;
      this.subscribe(room);
      return this.socket.on(room, cb.bind(this));
    }
  }

  _identify() {
    const { token } = this.store.getState().account;
    if (!this.identified && token) {
      this.socket.emit('identify', token);
      this.identified = true;
    }
  }
  _dispatch(action) {
    this.store.dispatch(action);
  }
}

export default new Socket();
