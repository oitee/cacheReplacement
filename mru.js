class MRUCache {
  constructor(n) {
    this.size = n;
    this.table = {};
    this.accessed = {};
    this.counterCount = 0;
  }
  has(...args) {
    return this.table.hasOwnProperty(args);
  }
  hit(...args) {
    this.accessed[args] = ++this.counterCount;
    return this.table[args];
  }
  miss(result, ...args) {
    if (Object.keys(this.table).length >= this.size) {
      let most = 0;
      let candidateKey;
      for (let key in this.accessed) {
        if (this.accessed[key] > most) {
          most = this.accessed[key];
          candidateKey = key;
        }
      }
      delete this.table[candidateKey];
      delete this.accessed[candidateKey];
    }
    this.table[args] = result;
    this.accessed[args] = ++this.counterCount;
  }
}

let mruCacheForFibo = new MRUCache(10);

//Function that accepts: a cache object, and a function
// It will invoke has(), hit() and miss() of the cache object
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

//Calling the above function to memoise the Fibonacci function
let memoizedFiboMru = cacheThisFunction(mruCacheForFibo, (n) => {
  if (n == 0 || n == 1) {
    return n;
  }
  return memoizedFiboMru(n - 2) + memoizedFiboMru(n - 1);
});

console.log(memoizedFiboMru(50));
