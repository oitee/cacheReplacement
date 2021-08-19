export class LIFOCache {
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
        let popped = this.counter.pop();
        delete this.table[popped];
      }
      this.table[key] = value;
      this.counter.push(key);
    }
  }
