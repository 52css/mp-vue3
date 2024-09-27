import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts", // 入口文件
  // external: ["miniprogram-api-typings"],
  output: [
    {
      name: "MpVue3",
      file: "dist/mp-vue3.umd.js",
      format: "umd",
      // sourcemap: true,
    },
    {
      file: "dist/mp-vue3.cjs.js",
      format: "cjs", // CJS 格式
      // sourcemap: true, // 开启 sourcemap
    },
    {
      file: "dist/mp-vue3.esm.js", // ESM 文件
      format: "esm", // ESM 格式
      // sourcemap: true,
    },
  ],
  plugins: [
    resolve(), // 使 Rollup 能够查找并打包 node_modules 中的模块
    commonjs(), // 将 CommonJS 模块转换为 ES6，以便 Rollup 可以处理它们
    typescript({
      tsconfig: "tsconfig.json", // 指定 tsconfig.json 文件
      useTsconfigDeclarationDir: true,
    }), // 支持 TypeScript
    replace({
      values: {
        // __DEV__: false,
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
      preventAssignment: true,
    }),
    terser(), // 压缩代码
  ],
};
