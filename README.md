# cacheReplacement

This library implements some common cache replacement policies. This API is inspired from this [Clojure repository](https://github.com/clojure/core.cache).

## Use Case

Cache refers to the storage of data that is likely to be requested in the future. Thus, cache enables quick retrieval of data, thereby helping in siginificantly reducing the run-time of an operation. For example, function that generates the nth Fibonacci number, by recursively calling itself, will result in a run-time error if we pass a relatively large number (say 50).

```js
function fibo(n){
    if(n == 1 || n == 0){
        return n;
    }
    return fibo(n - 2) + fibo (n - 1);
}
```

However, this problem can be fixed if we memoize the said function, such that return values of previous function calls are stored. This can be done by creating a cache object by invoking any of the classes provided in this library.

This library implements the following cache replacement policies:

- **First-in-first-out (FIFO) policy:** The earliest inserted item in the cache will be evicted when a new item needs to be inserted. 

- **Last-in-first-out (LIFO) policy:** The last item inserted in the cache will evicted first.

- **Least-recently used (LRU) policy:** The item which is least recently accessed will be evicted first.

- **Most-recently used (MRU) policy:** The item which is most recently accessed will be evicted first. 

- **Least-frequently-used(LFU) policy**: The item which is least frequently accessed in the cache will be evicted first.

- **Time-to-live (TTL) policy**: If an item remains in the cache beyond a given period of time without being accessed, the cache algorithm would discard it, to make room for a new item. If there is no such item in the cache, the least frequently used item (LFU) will be replaced.

- **Random replacement (RR) policy**: A random item in the cache will be evicted to add a new item.

## Usage

To use this library, a cache object will need be created by invoking the relevant class (implementing the relevant cache replacement policy). Thereafter, while accessing and adding new items to the cache, relevant methods will need to be invoked.

### Creating a cache object

To create a cache object, the JavaScript file containing the relevant cache replacement policy will need to be imported, followed by invoking the corresponding constructor (by using the `new` keyword). Importantly, while creating a cache object, the size of the object needs to be passed as a parameter. 

For example, a cache object that implementing LRU policy can be implemented in the following manner:

```js
import * as lru from "lru.js"
let newObject = new LRUCache(4);
```

Here is a list of all the cache replacement policies implemented in the library, along with the corresponding names of the files and their constructors:

| Cache Replacement Polciy      | File Name | Constructor | 
| ----------------------------- | --------- | ----------- |
| First-in-first-out (FIFO)     | fifo.js   |FIFOCache    |
| Last-in-first-out (LIFO)      | lifo.js   |LIFOCache    |
| Least-recently used (LRU)     | lru.js    |LRUCache     |
| Most-recently used (MRU)      | mru.js    |MRUCache     |
| Least-frequently-used(LFU)    | lfu.js    |LFUCache     |
| Time-to-live (TTL)            | ttl.js    |TTLCache     |
| Random replacement (RR)       | rr.js     |RRCache      |

### has 

Once a cache object is created, the method `has` can be invoked to check a specific value is present in that cache, by passing its corresponding key. This method will always either return `true` or `false`.

```js
import * as lru from "lru.js"
let newObject = new LRUCache(4);

newObject.has(2);// false
```

### hit

The method `hit` is meant to be invoked to access the corresponding value of a key present in the cache. This method presumes the existence of the key. Thus, it should only be invoked if the `has` method returns `true`.

```js
import * as lru from "lru.js"
let newObject = new LRUCache(4);

if(newObject.has(2)){
    return newObject.hit(2);
}
```

#### miss

The method `miss` is meant to add a key-value pair that is currently not present in the cache. This method presumes the absence of the key-value pair. Thus, it should be invoked only when the `has` method returns `false` for a given key. Importantly, this method will not return any value.

```js
import * as lru from "lru.js"
let newObject = new LRUCache(4);

if(newObject.has(2)){
    return newObject.hit(2);
}
else{
    newObject.miss(2, "three");
}
```

## Further Implementation

The author is be open to adding implementations of other cache replacement polcies in this library. Please feel free to submit a pull request!