import { isObject } from "../utils/index";

export function renderMixin(Vue) {
  Vue.prototype._c = function () {
    return createElement(...arguments);
  };

  Vue.prototype._v = function (text) {
    return createTextNode(text);
  };

  Vue.prototype._s = function (val) {
    return val == null ? "" : isObject(val) ? JSON.stringify(val) : val;
  };

  Vue.prototype._render = function () {
    const vm = this;
    const render = vm.$options.render;
    let vnode = render.call(vm);
    return vnode;
  };
}

function createElement(tag, data = {}, ...children) {
  const key = data.key;
  delete data.key;
  return vnode(tag, data, key, children);
}

function createTextNode(text) {
  return vnode(undefined, undefined, undefined, undefined, text);
}

// 用来创建虚拟dom的
function vnode(tag, data, key, children, text) {
  return {
    tag,
    data,
    key,
    children,
    text,
  };
}
