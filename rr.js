export class RRCache {
  constructor(n) {
    this.size = n;
    this.table = {};
  }
  has(key) {
    return this.table.hasOwnProperty(key);
  }
  hit(key) {
    return this.table[key];
  }
  miss(key, value) {
    if (Object.keys(this.table).length >= this.size) {
      let keyList = Object.keys(this.table);
      let randomIndex = Math.floor(Math.random() * (keyList.length - 1));
      let randomKey = keyList[randomIndex];
      delete this.table[randomKey];
    }
    this.table[key] = value;
  }
}
