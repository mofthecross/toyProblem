/*
Design and implement a data structure for Least Recently Used (LRU) cache.
It should support the following operations: get and set.

get(key) - Get the value (will always be positive) of the key if the key
exists in the cache, otherwise return -1.

set(key, value) - Set or insert the value if the key is not already present.
When the cache reached its capacity, it should invalidate the least recently
used item before inserting a new item.
*/

const DoublyLinkedList = require('es6datastructures').DoublyLinkedList;

class LRUCache {
  constructor(limit) {
    this.storage = {};
    this.list = new DoublyLinkedList();
    this.limit = limit;
  }

  get(key) {
    if (key in this.storage) {
      let data = this.storage[key].data;
      this.set(data[0], data[1]);
      return data[1];
    } else {
      return -1;
    }
  }

  set(key, value) {
    if (key in this.storage) {
      let node = this.storage[key];
      this.list.remove(node);
    }

    if (this.limit === this.list.size()) {
      let leastRecentlyUsed = this.list.head();
      this.list.remove(leastRecentlyUsed);
      delete this.storage[leastRecentlyUsed.data[0]];
    }
    this.storage[key] = this.list.append([key, value]);
  }
}

module.exports = LRUCache;
