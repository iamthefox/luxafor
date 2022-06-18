import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.mjs",
      format: "es",
    },
    {
      file: "dist/index.js",
      format: "cjs",
    },
  ],
  plugins: [
    typescript(),
    terser({
      ecma: 5,
      module: true,
      toplevel: true,
      compress: { pure_getters: true },
      format: { wrap_func_args: false },
    }),
  ],
  external: ["os", "node-hid", "colord", "colord/plugins/names"],
};
