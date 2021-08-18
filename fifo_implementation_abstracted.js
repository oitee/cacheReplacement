//Class for all creating cache objects
//following FIFO policy
class FifoCache {
  constructor(n) {
    this.size = n;
    this.table = {};
    this.counter = [];
  }
  has(...args) {
    return this.table.hasOwnProperty(args);
  }
  hit(...args) {
    return this.table[args];
  }
  miss(result, ...args) {
    if (this.counter.length > this.size) {
      let dequeued = this.counter.shift();
      delete this.table[dequeued];
    }
    this.table[args] = result;
    this.counter.push(args);
  }
}
//Creating a new cache object
//by invoking FifoCache
let fifoCacheForFibo = new FifoCache(3);

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
let memoizedFiboFifo = cacheThisFunction(fifoCacheForFibo, (n) => {
  if (n == 0 || n == 1) {
    return n;
  }
  return memoizedFiboFifo(n - 2) + memoizedFiboFifo(n - 1);
});

console.log(memoizedFiboFifo(50));
