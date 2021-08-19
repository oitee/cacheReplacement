export class LFUCache {
  constructor(n) {
    this.size = n;
    this.table = {};
    this.counter = [];
  }
  has(key) {
    console.log("has:")
    console.log("key: " + key);
    console.log(this.table);
    console.log(`returns: ${this.table.hasOwnProperty(key)}`);
    console.log();
    if (this.table.hasOwnProperty(key)) {
      return true;
    }
    return false;
  }
  hit(key) {
    console.log(`hit. Key is ${key}`);
    console.log(this.table);
    console.log(`returns ${this.table[key]}`);
    console.log();
    this.counter[key]++;
    return this.table[key];
  }
  miss(key, value) {
    console.log(`miss: key: ${key} and value: ${value}`);
    console.log(this.table);
    if (Object.keys(this.table).length >= this.size) {
      let lowest;
      let lowestKey;
      for (let k in this.counter) {
        if (lowest == undefined) {
          lowest = this.counter[key];
          lowestKey = k;
        } else {
          if (lowest > this.counter[k]) {
            lowest = this.counter[k];
            lowestKey = k;
          }
        }
      }
      delete this.table[lowestKey];
      delete this.counter[lowestKey];
    }
    this.table[key] = value;
    this.counter[key] = 1;
    console.log();
    console.log(`this.table after addition`);
    console.log(this.table);
    console.log();
  }
}