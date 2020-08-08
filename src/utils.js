export function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

export function def(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false,
    configurable: false,
    value,
  });
}

export function proxy(data, source, key) {
  Object.defineProperty(data, key, {
    get() {
      return data[source][key];
    },
    set(newValue) {
      data[source][key] = newValue;
    },
  });
}
