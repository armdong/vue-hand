import { initState } from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;

    // 将用户传入的options参数挂到实例的$options属性上
    vm.$options = options;

    // 初始化状态
    initState(vm);

    // TODO: 初始化事件，初始化生命周期，初始化watch等等
  };
}
