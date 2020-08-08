import { initState } from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;

    // 初始化状态
    initState(vm);

    // TODO: 初始化事件，初始化生命周期，初始化watch等等
  };
}
