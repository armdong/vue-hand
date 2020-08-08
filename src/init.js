import { initState } from "./state";
import { compileToFunctions } from "./compiler/index";
import { mountComponent, callHook } from "./lifecycle";
import { mergeOptions } from "./utils/index";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;

    // 将用户传入的options参数挂到实例的$options属性上
    // 需要将用户自定义的options和全局的options做合并
    vm.$options = mergeOptions(vm.constructor.options, options);

    callHook(vm, "beforeCreate");

    // 初始化状态
    initState(vm);

    callHook(vm, "created");

    // 如果当前options中有el属性，进行渲染
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    vm.$el = el;

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

    // 需要挂载这个组件
    mountComponent(vm, el);
  };
}

// Vue的渲染流程：
// 初始化数据 -> 将模板进行编译 -> render函数 -> 生成虚拟节点 -> 生成真实dom -> 渲染到页面中

// 数据变化自动调用 vm._update(vm._render())
