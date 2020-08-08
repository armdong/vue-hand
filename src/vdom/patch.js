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
    updateProperties(vnode);
    children.forEach((child) => {
      vnode.el.appendChild(createElem(child));
    });
  } else {
    // 创建文本，放到vnode.el上
    vnode.el = document.createTextNode(text);
  }

  return vnode.el;
}

function updateProperties(vnode) {
  const el = vnode.el;
  let newProps = vnode.data || {};

  for (let key in newProps) {
    if (key === "style") {
      // 处理style
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === "class") {
      // 处理 class
      el.classList = newProps[key];
    } else {
      // 普通属性
      el.setAttribute(key, newProps[key]);
    }
  }
}
