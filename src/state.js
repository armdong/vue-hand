import { observe } from "./observer/index";
import { proxy } from "./utils/index";

export function initState(vm) {
  const opts = vm.$options;

  // 初始化 props
  if (opts.props) {
    initProps(vm);
  }

  // 初始化 methods
  if (opts.methods) {
    initMethods(vm);
  }

  // 初始化 data
  if (opts.data) {
    initData(vm);
  }

  // 初始化 computed
  if (opts.computed) {
    initComputed(vm);
  }

  // 初始化 watch
  if (opts.watch) {
    initWatch(vm);
  }
}

function initProps(vm) {}

function initMethods(vm) {}

function initData(vm) {
  let data = vm.$options.data;

  // 给vm实例上挂载_data属性，作用相当于搭建了一个桥梁，方便我们对data进行操作
  vm._data = data = typeof data === "function" ? data.call(vm) : data;

  // 给data上的每个属性添加代理，当我们对vm上的属性进行get和set操作时，将其代理到vm._data上
  for (let key in data) {
    proxy(vm, "_data", key);
  }
  observe(data);
}

function initComputed(vm) {}

function initWatch(vm) {}
