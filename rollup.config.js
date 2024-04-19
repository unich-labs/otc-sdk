import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-polyfill-node";
import terser from "@rollup/plugin-terser";

export default {
    input: "dist/index.js",
    output: {
        file: "dist.browser/index.js",
        format: "umd",
        name: "LC",
    },
    context: "commonjsGlobal",
    plugins: [commonjs(), resolve({ browser: true }), json(), nodePolyfills(), terser()],
};
