import { parseHTML } from "./parse-html";
import { generate } from "./generate";

// template -> render
export function compileToFunctions(template) {
  // 1、将html代码转换成ast语法树
  const ast = parseHTML(template);

  // 2、优化静态节点 TODO

  // 3、通过ast语法树重新生成代码
  const code = generate(ast);

  // 4、将字符串变成函数，限制取值范围，通过with来进行取值
  // 稍后调用render函数就可以通过改变this，让这个函数内部取到结果了
  const render = new Function(`with(this) { return ${code}; }`);

  return render;
}
