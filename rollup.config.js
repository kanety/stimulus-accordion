import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import bundleSize from "rollup-plugin-bundle-size";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";

export default {
  input: "src/index.js",
  external: [
    "@hotwired/stimulus",
    "@kanety/stimulus-static-actions"
  ],
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      exports: "auto",
      sourcemap: true,
    },
    {
      file: "dist/index.module.mjs",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "StimulusAccordion",
      globals: {
        "@hotwired/stimulus": "Stimulus",
        "@kanety/stimulus-static-actions": "StimulusStaticActions",
      },
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extract: "index.css",
      minimize: true,
      sourceMap: true,
      extensions: [".css", ".scss", ".sass"],
      plugins: [
        autoprefixer()
      ],
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".js"],
      exclude: "node_modules/**",
    }),
    terser(),
    bundleSize()
  ],
};
