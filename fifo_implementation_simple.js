function fifo(f) {
  let cache = {};
  let counter = [];
  return (...args) => {
    if (cache.hasOwnProperty(args)) {
      return cache[args];
    }
    let result = f(...args);
    if (counter.length >= 2) {
      let dequeued = counter.shift();
      delete cache[dequeued];
    }
    cache[args] = result;
    counter.push(args);
    return result;
  };
}

let fiboFIFO = fifo((n) => {
  if (n == 0 || n == 1) {
    return n;
  }
  return fiboFIFO(n - 2) + fiboFIFO(n - 1);
});

console.log(fiboFIFO(50));
