export default function() {
  // Identity is lost on a disconnect
  console.log('Lost connection to socket manager');
  this.identified = false;
}
