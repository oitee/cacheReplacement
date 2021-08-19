//Class for creating cache objects
//following LRU policy
class LRUCache {
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
      let least = this.counterCount;
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
    this.accessed[args] = ++this.counterCount;
  }
}
//Creating a new cache object
//by invoking LRUCache
let lruCacheForFibo = new LRUCache(3);

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
let memoizedFiboLru = cacheThisFunction(lruCacheForFibo, (n) => {
  if (n == 0 || n == 1) {
    return n;
  }
  return memoizedFiboLru(n - 2) + memoizedFiboLru(n - 1);
});

console.log(memoizedFiboLru(50));