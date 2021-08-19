export class MRUCache {
  constructor(n) {
    this.size = n;
    this.table = {};
    this.accessed = {};
    this.counterCount = 0;
  }
  has(key) {
    return this.table.hasOwnProperty(key);
  }
  hit(key) {
    this.accessed[key] = ++this.counterCount;
    return this.table[key];
  }
  miss(key, value) {
    if (Object.keys(this.table).length >= this.size) {
      let most = 0;
      let candidateKey;
      for (let k in this.accessed) {
        if (this.accessed[k] > most) {
          most = this.accessed[k];
          candidateKey = k;
        }
      }
      delete this.table[candidateKey];
      delete this.accessed[candidateKey];
    }
    this.table[key] = value;
    this.accessed[key] = ++this.counterCount;
  }
}