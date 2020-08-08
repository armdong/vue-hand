import { initMixin } from "./init";
import { renderMixin } from "./vdom/index";
import { lifecycleMixin } from "./lifecycle";

function Vue(options) {
  // 初始化
  this._init(options);
}

// 插件开发
initMixin(Vue); // init 初始化
lifecycleMixin(Vue); // _update
renderMixin(Vue); // _render

export default Vue;
