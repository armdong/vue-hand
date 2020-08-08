import { path } from "./vdom/patch";
import Watcher from "./observer/watcher";

// 调用render方法去渲染el属性
export function mountComponent(vm, el) {
  callHook(vm, "beforeMounte");

  // 调用render方法创建虚拟节点并且将虚拟节点渲染到页面上
  const updateComponent = () => {
    vm._update(vm._render());
  };
  // 这个 watcher 是用于渲染的，目前没有任何功能 updateComponent
  const watcher = new Watcher(
    vm,
    updateComponent,
    () => {
      callHook(vm, "beforeUpdate");
    },
    true
  );

  callHook(vm, "mounted");
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    // 用新创建的元素替换掉老的元素
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
