
export class TTLCache {
  constructor(n, time) {
//'time' to be in seconds
    this.size = n;
    this.timeLimit = time;
    this.table = {};
    this.accessed = {};
  }
  has(key) {
    return this.table.hasOwnProperty(key);
  }
  hit(key) {
    this.accessed[key] = Date.now();
    let current = Date.now();
    for(let k in this.accessed){
        if(current - this.accessed[k] > this.timeLimit){
            delete this.table[k];
            delete this.accessed[k];
        }
    }
    return this.table[key];
  }
  miss(key, value) {
    let current = Date.now();
    for(let k in this.accessed){
        if(current - this.accessed[k] > this.timeLimit){
            delete this.table[k];
            delete this.accessed[k];
        }
    }
    if (Object.keys(this.table).length >= this.size) {
      let least = Date.now();
      let candidateKey;
      for (let k in this.accessed) {
        if (this.accessed[k] < least) {
          least = this.accessed[k];
          candidateKey = k;
        }
      }
      delete this.table[candidateKey];
      delete this.accessed[candidateKey];
    }
    this.table[key] = value;
    this.accessed[key] = Date.now;
  }
}