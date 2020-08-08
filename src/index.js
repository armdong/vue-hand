import { initMixin } from "./init";
import { renderMixin } from "./vdom/index";
import { lifecycleMixin } from "./lifecycle";

function Vue(options) {
  // 初始化
  this._init(options);
}

// 原型扩展 -> 初始化
initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

export default Vue;
