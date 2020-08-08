import { pushTarget, popTarget } from "./dep";

let id = 0;

export default class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm; // vm 实例
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.options = options;
    this.id = id++; // watcher唯一标识
    this.deps = [];
    this.depsId = new Set();

    if (typeof exprOrFn === "function") {
      this.getter = exprOrFn;
    }

    this.get(); // 默认会调用get方法
  }

  addDep(dep) {
    const depId = dep.id;
    // 解决多次取值相同dep去重的问题
    if (!this.depsId.has(depId)) {
      this.deps.push(dep);
      this.depsId.add(depId);
      dep.addSub(this);
    }
  }

  get() {
    pushTarget(this); // 当前watcher实例
    this.getter(); // 调用exprOrFn
    popTarget();
  }

  update() {
    this.get();
  }
}

// 在数据劫持的时候，定义defineProperty的时候，已经给每个属性都增加了一个dep

// 1、是想把这个渲染watcher放到了Dep.target属性上
// 2、开始渲染，取值会调用get方法，需要让这个属性的dep存储当前的watcher
// 3、页面上所需要的属性都会将这个watcher存在自己的dep中
// 4、等会属性更新了就重新调用渲染逻辑，通知自己存储的watcher来更新
