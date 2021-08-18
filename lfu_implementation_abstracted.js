class LeastFrequentCache {
  constructor(n) {
    this.size = n;
    this.table = {};
    this.counter = [];
  }
  has(...args) {
    if (this.table.hasOwnProperty(args)) {
      this.counter[args]++;
      return true;
    }
    return false;
  }
  hit(...args) {
    this.counter[args]++;
    return this.table[args];
  }
  miss(result, ...args) {
    if (Object.keys(this.table).length >= this.size) {
      let lowest;
      let lowestKey;
      for (let key in this.counter) {
        if (lowest == undefined) {
          lowest = this.counter[key];
          lowestKey = key;
        } else {
          if (lowest > this.counter[key]) {
            lowest = this.counter[key];
            lowestKey = key;
          }
        }
      }
      delete this.table[lowestKey];
      delete this.counter[lowestKey];
    }
    this.table[args] = result;
    this.counter[args] = 1;
  }
}


let fiboLfuCache = new LeastFrequentCache(5);
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

let memoizedFiboLfu = cacheThisFunction(fiboLfuCache, (n) => {
  if (n == 1 || n == 2) {
    return n;
  }
  return memoizedFiboLfu(n - 2) + memoizedFiboLfu(n - 1);
});

console.log(memoizedFiboLfu(55));