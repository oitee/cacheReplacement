function mru(f) {
    let cache = {};
    let accessed = {};
    let counterCount = 0;
    return (...args) => {
      if (cache.hasOwnProperty(args)) {
        accessed[args] = ++counterCount;
        return cache[args];
      }
      let result = f(...args);
      if (Object.keys(cache).length >= 10) {
        let most = 0;
        let candidateKey;
        for (let key in accessed) {
          if (accessed[key] > most) {
            most = accessed[key];
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
  let fiboMRU = mru((n) => {
    if (n == 0 || n == 1) {
      return n;
    }
    return fiboMRU(n - 2) + fiboMRU(n - 1);
  });
  console.log(fiboMRU(50));
  