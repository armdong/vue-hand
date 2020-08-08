const arrayProto = Array.prototype;
export let arrayMethods = Object.create(arrayProto);

// 重写的方法有：push, pop, shift, unshift, sort, reverse, splice, 这7个方法会影响原数组的值
const methods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "sort",
  "reverse",
  "splice",
];

methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    const results = arrayProto[method].apply(this, args);
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted); // 对新增的每一项进行观测
    return results;
  };
});
