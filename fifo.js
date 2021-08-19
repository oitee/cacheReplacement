export class FIFOCache {
  constructor(n) {
    this.size = n;
    this.table = {};
    this.counter = [];
  }
  has(key) {
    return this.table.hasOwnProperty(key);
  }
  hit(key) {
    return this.table[key];
  }
  miss(key, value) {
    if (this.counter.length >= this.size) {
      let dequeued = this.counter.shift();
      delete this.table[dequeued];
    }
    this.table[key] = value;
    this.counter.push(key);
  }
}
