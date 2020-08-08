import { parseHTML } from "./parse-html";

// template -> render
export function compileToFunctions(template) {
  // 1、将html代码转换成ast语法树
  let ast = parseHTML(template);
  console.log(ast);

  // 2、优化静态节点 TODO

  // 3、通过ast语法树重新生成代码
}
