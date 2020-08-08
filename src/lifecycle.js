import { path } from "./vdom/patch";

// 调用render方法去渲染el属性
export function mountComponent(vm, el) {
  // 1、调用render方法创建虚拟节点
  const vnode = vm._render();

  // 2、将虚拟节点渲染到页面上
  vm._update(vnode);
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    vm.$el = path(vm.$el, vnode);
  };
}
