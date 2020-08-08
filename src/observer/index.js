import { isObject, def } from "../utils/index";
import { arrayMethods } from "./array";
import Dep from "./dep";

class Observer {
  constructor(value) {
    // 给每个属性添加一个__ob__属性，这个属性不可枚举，不可删除
    // 如果有这个属性，表示该属性已经被观测过了
    def(value, "__ob__", this);

    if (Array.isArray(value)) {
      // 当value是数组的话，将value上的数组方法进行重写
      value.__proto__ = arrayMethods; // AOP 切片编程

      // 检测数组中的每一项
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
  observe(value); // value 可能也是对象

  const dep = new Dep(); // 每个属性都有一个dep

  Object.defineProperty(data, key, {
    get() {
      // 依赖收集
      // new Watcher()的时候，执行updateComponent的时候Dep.target有值
      if (Dep.target) {
        // 让这个属性记住这个watcher
        dep.depend();
      }
      return value;
    },
    set(newValue) {
      if (value === newValue) return;
      observe(newValue); // newValue 也可能是对象
      value = newValue;

      // 依赖更新
      dep.notify();
    },
  });
}

export function observe(data) {
  if (!isObject(data)) {
    return data;
  }
  if (data.__ob__) {
    return data;
  }
  return new Observer(data);
}
