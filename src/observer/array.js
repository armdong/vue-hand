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

    // 通知数组更新
    ob.dep.notify();

    return results;
  };
});

// 1、我对arr取值的时候，会调用get方法，我希望让当前数组记住这个渲染watcher
// 2、我给所有的对象类型都增加一个dep属性
// 3、当页面对arr取值的时候，我就让数组的dep记住当前渲染watcher
// 4、当改变数组的时候，让dep通知watcher更新页面
