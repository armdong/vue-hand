import { initState } from "./state";
import { compileToFunctions } from "./compiler/index";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;

    // 将用户传入的options参数挂到实例的$options属性上
    vm.$options = options;

    // 初始化状态
    initState(vm);

    // 如果当前options中有el属性，进行渲染
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);

    if (!options.render) {
      // 没有render，将template转化成render方法
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
      }

      // 编译原理  将tempalte编译成render方法
      const render = compileToFunctions(template);
      options.render = render;
    }

    // console.log(options.render);
  };
}
