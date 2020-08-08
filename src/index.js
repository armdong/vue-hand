import { initMixin } from "./init";
import { renderMixin } from "./vdom/index";
import { lifecycleMixin } from "./lifecycle";
import { initGlobalApi } from "./global-api/index";

function Vue(options) {
  // 初始化
  this._init(options);
}

// 原型方法：插件开发
initMixin(Vue); // init 初始化
lifecycleMixin(Vue); // _update
renderMixin(Vue); // _render

// 静态方法
initGlobalApi(Vue);

export default Vue;
