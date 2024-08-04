import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: "src/index.ts", // 入口文件
  output: [
    {
      name: 'MpVue3',
      file: "dist/mp-vue3.min.js",
      format: "umd",
    },
  ],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"), // 替换为 'production' 或 'development'
      preventAssignment: true,
    }),
    resolve(), // 解析 Node.js 模块
    commonjs(), // 将 CommonJS 模块转换为 ES6
    typescript({
      tsconfig: "tsconfig.json", // 指定 tsconfig.json 文件
      useTsconfigDeclarationDir: true
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**' // 仅编译我们的源代码
    }),
    terser() // 压缩代码
  ],
};
