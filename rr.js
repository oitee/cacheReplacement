class RRCache {
  constructor(n) {
    this.size = n;
    this.table = {};
  }
  has(...args) {
    return this.table.hasOwnProperty(args);
  }
  hit(...args) {
    return this.table[args];
  }
  miss(result, ...args) {
    if (Object.keys(this.table).length >= this.size) {
      let keys = Object.keys(this.table);
      let randomIndex = Math.floor(Math.random() * (keys.length - 1));
      let randomKey = keys[randomIndex];
      delete this.table[randomKey];
    }
  }
}

let fiboRandomCache = new RRCache(5);
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

let memoizedFiboRandom = cacheThisFunction(fiboRandomCache, (n) => {
  if (n == 1 || n == 2) {
    return n;
  }
  return memoizedFiboRandom(n - 2) + memoizedFiboRandom(n - 1);
});

console.log(memoizedFiboRandom(10));
