import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/index.ts", // 入口文件
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs", // CommonJS 格式
    },
    {
      file: "dist/index.esm.js",
      format: "esm", // ES module 格式
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
  ],
};
