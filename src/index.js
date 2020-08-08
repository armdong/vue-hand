import { initMixin } from "./init";

function Vue(options) {
  // 初始化
  this._init(options);
}

// 原型扩展 -> 初始化
initMixin(Vue);

export default Vue;
