export function path(oldVnode, vnode) {
  // 将虚拟节点转换成真实节点

  const el = createElem(vnode);
  const parentElm = oldVnode.parentNode;
  parentElm.insertBefore(el, oldVnode.nextSibling);
  parentElm.removeChild(oldVnode);
  return el;
}

// vnode -> dom
function createElem(vnode) {
  const { tag, data, key, children, text } = vnode;

  if (typeof tag === "string") {
    // 创建元素，放到vnode.el上
    vnode.el = document.createElement(tag);
    if (data) {
      for (let attr in data) {
        if (attr === "style") {
          for (let prop in data.style) {
            vnode.el.style[prop] = data.style[prop];
          }
        } else {
          vnode.el.setAttribute(attr, data[attr]);
        }
      }
    }
    children.forEach((child) => {
      vnode.el.appendChild(createElem(child));
    });
  } else {
    // 创建文本，放到vnode.el上
    vnode.el = document.createTextNode(text);
  }

  return vnode.el;
}
