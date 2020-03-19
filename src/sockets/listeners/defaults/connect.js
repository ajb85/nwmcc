/*
    Disconnects from the socket manager are common and subscriptions are lost
    each time it occurs.  This will fire each time the connection is reestablished
    thus it can be used to regain all subscriptions.
*/

export default function() {
  console.log('Connected to socket manager');
  if (!this.identified) {
    // Identify again to the backend
    console.log(3);
    this._identify();
  }

  if (Object.keys(this.subscribed).length) {
    // Resub to all subscriptions
    for (let room in this.subscribed) {
      this.emit('subscribe', room);
    }
  }
}
