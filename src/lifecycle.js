import { path } from "./vdom/patch";

// 调用render方法去渲染el属性
export function mountComponent(vm, el) {
  callHook(vm, "beforeMounte");
  // 1、调用render方法创建虚拟节点
  // 2、将虚拟节点渲染到页面上
  vm._update(vm._render());
  callHook(vm, "mounted");
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    vm.$el = path(vm.$el, vnode);
  };
}

// 调用生命周期
export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let handle of handlers) {
      handle.call(vm); // 更改生命周期this指向
    }
  }
}
