import { mergeOptions } from "../utils/index";

export function initGlobalApi(Vue) {
  Vue.options = {}; // Vue.components Vue.directive

  Vue.mixin = function (mixins) {
    // 合并对象,（我先考虑生命周期，不考虑其他的合并）
    this.options = mergeOptions(this.options, mixins);
  };
}
