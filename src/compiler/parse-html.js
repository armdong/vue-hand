import { unicodeRegExp } from "../utils/index";

// Regular Expressions for parsing tags and attributes
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 属性
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`; // 标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // 自定义标签名，可能是命名空间标签 <my:xx>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 开始标签开始
const startTagClose = /^\s*(\/?)>/; // 开始标签结束
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 结束标签

// html -> ast
export function parseHTML(html) {
  let root;
  let currentParent;
  let stack = [];

  // 标签是否符合预期  <div><span></div></span>
  function start(tagName, attrs) {
    let element = createASTElement(tagName, attrs);
    if (!root) {
      root = element;
    }
    currentParent = element;
    stack.push(element); // 将生成的ast元素放入栈中
  }

  function end() {
    // 在结尾标签处 创建父子关系
    let element = stack.pop(); // 取出栈中的最后一个
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      // 在闭合时可以知道这个标签的父亲是谁
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }

  function chars(text) {
    text = text.replace(/\s/g, "");
    if (text) {
      currentParent.children.push({
        type: 3,
        text,
      });
    }
  }

  // 将字符串进行截取操作，再更新html内容
  function advance(step) {
    html = html.substring(step);
  }

  // 匹配开始标签
  function parseStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };

      advance(start[0].length);

      // 如果直接是闭合标签了，说明没有属性
      let end;
      let attr;
      while (
        !(end = html.match(startTagClose)) && // 不是结尾
        (attr = html.match(attribute)) // 匹配到属性
      ) {
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
        advance(attr[0].length);
      }

      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }

  // 只要html不为空，就一直解析
  while (html) {
    let text;
    let textEnd = html.indexOf("<");

    if (textEnd === 0) {
      // 开始标签
      const startTagMatch = parseStartTag(); // 开始标签匹配的结果
      if (startTagMatch) {
        // 处理开始
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      // 结束标签
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        // 处理结束
        end();
        advance(endTagMatch[0].length);
        continue;
      }
    }

    if (textEnd > 0) {
      // 文本
      text = html.substring(0, textEnd);
    }
    if (text) {
      // 处理文本
      chars(text);
      advance(text.length);
    }
  }

  return root;
}

function createASTElement(tagName, attrs) {
  return {
    tag: tagName, // 标签名
    type: 1, // 元素类型
    children: [], // 孩子
    attrs, // 属性
    parent: null, // 父元素
  };
}
