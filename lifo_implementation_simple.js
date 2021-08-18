function lifo(f) {
  let cache = {};
  let counter = [];
  return (...args) => {
    if (cache.hasOwnProperty(args)) {
      return cache[args];
    }
    let result = f(...args);
    if (counter.length >= 5) {
      let popped = counter.pop();
      delete cache[popped];
    }
    cache[args] = result;
    counter.push(args);
    return result;
  };
}

let cacheFiboLifo = lifo((n) => {
  if (n == 0 || n == 1) {
    return n;
  }
  return cacheFiboLifo(n - 1) + cacheFiboLifo(n - 2);
});
console.log(cacheFiboLifo(10));
