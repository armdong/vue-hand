const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

// 语法层面的转义
// ast -> code
export function generate(el) {
  const children = genChildren(el);
  const code = `_c('${el.tag}', ${
    el.attrs.length ? `${genProps(el.attrs)}` : "undefined"
  }${children ? `, ${children}` : ""})`;
  return code;
}

function gen(node) {
  if (node.type === 1) {
    // 生成元素节点的字符串
    return generate(node);
  } else {
    // 获取文本
    let text = node.text;

    if (!defaultTagRE.test(text)) {
      // 如果是普通文本不带{{}}
      return `_v(${JSON.stringify(text)})`;
    }

    let tokens = [];
    let lastIndex = (defaultTagRE.lastIndex = 0); // 如果正则是全局模式，需要每次使用前将lastIndex置为0
    let match, index; // 每次匹配到的结果

    while ((match = defaultTagRE.exec(text))) {
      index = match.index;
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      tokens.push(`_s(${match[1].trim()})`);
      lastIndex = match[0].length + index;
    }

    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)));
    }

    return `_v(${tokens.join(" + ")})`;
  }
}

function genProps(attrs) {
  let str = "";
  for (let attr of attrs) {
    if (attr.name === "style") {
      const obj = attr.value
        .split(";")
        .filter((prop) => !!prop)
        .reduce((style, prop) => {
          const [key, val] = prop.split(":");
          return { ...style, [key]: val.trim() };
        }, {});
      attr.value = obj;
    }
    str += ` ${attr.name}: ${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0, -1)}}`;
}

function genChildren(el) {
  const children = el.children;
  if (children) {
    // 将所有转化后的儿子用逗号拼接起来
    return children.map(gen).join(", ");
  }
}

function _v() {}
function _c() {}
function _s() {}
