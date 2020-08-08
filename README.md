# vue-hand

> 手写 `Vue` 2.x 源码

## 一、搭建开发环境

> `Vue` 采用 `rollup` 作为开发打包工具， `rollup` 针对于库的开发打包体积更小，打包后的代码更优雅。

**1、安装 `rollup`**

```bash
yarn add rollup @rollup/plugin-babel rollup-plugin-serve @babel/core @babel/preset-env -D
```

**2、配置 `babel` 新建 `.babelrc` 文件**

```json
// .babelrc
{
  "presets": ["@babel/preset-env"]
}
```

**3、创建 `rollup` 配置文件 `rollup.config.js`**

```javascript
// rollup.config.js

// rollup 支持 ES6 语法
import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";

export default {
  input: "./src/index.js", // 入口文件
  output: {
    file: "./dist/umd/vue.js", // 打包输出的路径和文件名
    name: "Vue", // 挂载到 window.Vue 属性上
    format: "umd", // 采用 umd 规范打包
    sourcemap: true, // 开启 sourcemap
  },
  plugins: [
    babel({
      exclude: /node_modules/, // node_modules 中的 js 文件不用 babel 转换
    }),
    // 开发静态文件服务器配置
    serve({
      open: true, // 默认打开浏览器
      openPage: "/public/index.html", // 默认打开的 html 文件
      port: 3000, // 开发端口
      contentBase: "", // 采用当前路径作为 contentBase
    }),
  ],
};
```

**4、配置 `scripts` 脚本，在 `package.json` 文件中的 `scripts` 节点中新增 `dev` 命令**

```json
// package.json

{
  "scripts": {
    "dev": "rollup -c -w"
  }
}
```

> `-c` 的意思是使用配置文件的意思，默认回去找当前目录下的 `rollup.config.js` 文件
>
> `-w` 的意思是监听文件变化，一旦文件有了变化，重新编译

