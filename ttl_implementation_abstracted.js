
class TTLCache {
  constructor(n, time) {
//'time' to be in seconds
    this.size = n;
    this.timeLimit = time;
    this.table = {};
    this.accessed = {};
  }
  has(...args) {
    return this.table.hasOwnProperty(args);
  }
  hit(...args) {
    this.accessed[args] = Date.now();
    let current = Date.now();
    for(let key in this.accessed){
        if(current - this.accessed[key] > this.timeLimit){
            delete this.table[key];
            delete this.accessed[key];
        }
    }
    return this.table[args];
  }
  miss(result, ...args) {
    let current = Date.now();
    for(let key in this.accessed){
        if(current - this.accessed[key] > this.timeLimit){
            delete this.table[key];
            delete this.accessed[key];
        }
    }
    if (Object.keys(this.table).length >= this.size) {
      let least = Date.now();
      let candidateKey;
      for (let key in this.accessed) {
        if (this.accessed[key] < least) {
          least = this.accessed[key];
          candidateKey = key;
        }
      }
      delete this.table[candidateKey];
      delete this.accessed[candidateKey];
    }
    this.table[args] = result;
    this.accessed[args] = Date.now;
  }
}

let fiboTtlCache = new TTLCache(5, 10);


function cacheThisFunction(cache, f) {
  return (...args) => {
    if (cache.has(...args)) {
      return cache.hit(...args);
    }
    let result = f(...args);
    cache.miss(result, ...args);
    return result;
  };
}


let memoizedFiboTtl = cacheThisFunction(fiboTtlCache, (n) => {
  if (n == 0 || n == 1) {
    return n;
  }
  return memoizedFiboTtl(n - 2) + memoizedFiboTtl(n - 1);
});

console.log(memoizedFiboTtl(50));
