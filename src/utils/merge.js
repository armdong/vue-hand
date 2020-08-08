export const LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
];

const strats = {};
// strats.data = function () {};
// strats.computed = function () {};
// strats.watch = function () {};

LIFECYCLE_HOOKS.forEach((hook) => {
  strats[hook] = mergeHook;
});

function mergeHook(parentVal, childVal) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
      ? childVal
      : [childVal]
    : parentVal;
}

export function mergeOptions(parent, child) {
  const options = {};

  // 父亲和儿子都有
  for (let key in parent) {
    mergeField(key);
  }

  // 儿子有父亲没有
  for (let key in child) {
    if (!parent.hasOwnProperty(key)) {
      mergeField(key);
    }
  }

  // 合并字段
  function mergeField(key) {
    // 根据key，不同的策略来进行合并
    if (strats[key]) {
      options[key] = strats[key](parent[key], child[key]);
    } else {
      // TODO 默认合并
      options[key] = child[key];
    }
  }

  return options;
}
