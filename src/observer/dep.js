/**
 * 多对多的关系，一个属性有一个dep是用来收集watcher的
 * 一个dep可以存多个watcher
 * 一个watcher可以对应多个dep
 */

let id = 0;

export default class Dep {
  constructor() {
    this.subs = [];
  }

  depend() {
    this.subs.push(Dep.target);
  }

  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}

Dep.target = null; // 静态属性

export function pushTarget(watcher) {
  Dep.target = watcher; // 保留watcher
}

export function popTarget() {
  Dep.target = null;
}