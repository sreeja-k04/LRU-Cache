class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        updateCacheState();
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
        updateCacheState();
    }
}

const cache = new LRUCache(4);

function put() {
    const key = document.getElementById("key").value;
    const value = document.getElementById("value").value;
    if (key && value) {
        cache.put(key, value);
        document.getElementById("key").value = "";
        document.getElementById("value").value = "";
    }
}

function get() {
    const key = document.getElementById("key").value;
    if (key) {
        const result = cache.get(key);
        document.getElementById("output").innerText = result !== -1 ? `Value: ${result}` : "Key not found";
        document.getElementById("key").value = "";
    }
}

function updateCacheState() {
    const cacheStateDiv = document.getElementById("cacheState");
    cacheStateDiv.innerHTML = "";
    let lastItem = null;
    cache.cache.forEach((value, key) => {
        const item = document.createElement("div");
        item.classList.add("cache-item");
        item.innerText = `${key}: ${value}`;
        cacheStateDiv.appendChild(item);
        lastItem = item;
    });
    if (lastItem) {
        lastItem.classList.add("least-recent");
    }
}
