function lru(f) {
  let cache = {};
  let accessed = {};
  let counterCount = 0;
  return (...args) => {
    if (cache.hasOwnProperty(args)) {
      accessed[args] = ++counterCount;
      return cache[args];
    }
    let result = f(...args);
    if (Object.keys(cache).length >= 2) {
      let least = counterCount;
      let candidateKey;
      for (let key in accessed) {
        if (accessed[key] < least) {
          least = accessed[key];
          candidateKey = key;
        }
      }
      delete cache[candidateKey];
      delete accessed[candidateKey];
    }
    cache[args] = result;
    accessed[args] = ++counterCount;
    return result;
  };
}
let fiboLRU = lru((n) => {
  if (n == 0 || n == 1) {
    return n;
  }
  return fiboLRU(n - 2) + fiboLRU(n - 1);
});
console.log(fiboLRU(50));
