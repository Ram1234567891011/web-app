"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const rollup_plugin_obfuscator_1 = __importDefault(require("rollup-plugin-obfuscator"));
const vite_1 = require("vite");
const root = (0, path_1.resolve)(__dirname, "src");
const outDir = (0, path_1.resolve)(__dirname, "dist");
exports.default = (0, vite_1.defineConfig)({
    root,
    publicDir: (0, path_1.resolve)(__dirname, "public"),
    build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
            plugins: [
                (0, rollup_plugin_obfuscator_1.default)({
                    fileOptions: {
                        compact: true,
                        controlFlowFlattening: true,
                        deadCodeInjection: true,
                        disableConsoleOutput: true,
                        renameGlobals: true,
                        rotateStringArray: true,
                        shuffleStringArray: true,
                        splitStrings: true,
                        splitStringsChunkLength: 5,
                        stringArray: true,
                        transformObjectKeys: true,
                    },
                }),
            ],
            input: {
                main: (0, path_1.resolve)(root, "index.html"),
                about: (0, path_1.resolve)(root, "about", "index.html"),
                iframe: (0, path_1.resolve)(root, "iframe", "index.html"),
            },
        },
    },
});
