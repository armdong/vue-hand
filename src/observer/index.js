import { isObject, def } from "../utils";
import { arrayMethods } from "./array";

class Observer {
  constructor(value) {
    // 给每个属性添加一个__ob__属性，这个属性不可枚举，不可删除
    // 如果有这个属性，表示该属性已经被观测过了
    def(value, "__ob__", this);
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  walk(data) {
    for (let key in data) {
      defineReactive(data, key, data[key]);
    }
  }

  observeArray(data) {
    data.forEach(observe);
  }
}

function defineReactive(data, key, value) {
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (value === newValue) return;
      observe(newValue);
      value = newValue;
    },
  });
}

export function observe(data) {
  if (!isObject(data)) {
    return data;
  }
  return new Observer(data);
}
