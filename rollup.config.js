/* eslint-disable import/no-extraneous-dependencies */
import fs from "fs";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import pkg from "./package.json";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                format: "cjs",
                file: "dist/sdk.cjs.production.min.js",
                sourcemap: true,
                plugins: [terser()],
            },
            {
                format: "umd",
                name: pkg.name
                    .split("-")
                    .map(([s, ...rest]) => [s.toUpperCase(), ...rest].join(""))
                    .join(""),
                file: pkg.unpkg,
                sourcemap: true,
                plugins: [terser()],
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            json(),
            typescript({
                declaration: true,
                declarationDir: "dist",
            }),
            replace({
                __DEV__: "false",
                preventAssignment: true,
                "process.env.ANCHOR_BROWSER": JSON.stringify(true),
            }),
        ],
        external: ["@coral-xyz/borsh", "@solana/web3.js", "@solana/spl-token"],
    },
    {
        input: "src/index.ts",
        output: [
            {
                format: "cjs",
                file: "dist/sdk.cjs.development.js",
                sourcemap: true,
            },
            {
                format: "es",
                file: "dist/sdk.esm.js",
                sourcemap: true,
            },
            {
                format: "es",
                file: "dist/sdk.esm.mjs",
                sourcemap: true,
            },
            {
                format: "umd",
                name: pkg.name
                    .split("-")
                    .map(([s, ...rest]) => [s.toUpperCase(), ...rest].join(""))
                    .join(""),
                file: pkg.unpkg.replace(
                    ".production.min.js",
                    ".development.js"
                ),
                sourcemap: true,
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            json(),
            typescript({
                declaration: true,
                declarationDir: "dist",
            }),
            replace({
                __DEV__: "true",
                preventAssignment: true,
                "process.env.ANCHOR_BROWSER": JSON.stringify(true),
            }),
            {
                name: "create-cjs-index",
                buildEnd: () => {
                    fs.writeFileSync(
                        "dist/index.js",
                        `
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./sdk.cjs.production.min.js')
} else {
  module.exports = require('./sdk.cjs.development.js')
}
`
                    );
                },
            },
        ],
        external: ["@coral-xyz/borsh", "@solana/web3.js", "@solana/spl-token"],
    },
];
