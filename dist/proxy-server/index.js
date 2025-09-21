"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
//import { createProxyMiddleware } from "http-proxy-middleware";
const { createProxyMiddleware } = require("http-proxy-middleware");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const http = (0, http_1.createServer)(app);
const path = require("path");
const socketProxy = createProxyMiddleware("/socket", {
    target: "wss://webminer.moneroocean.stream/",
    changeOrigin: true,
    ws: true,
    logLevel: "debug",
});
app.use(socketProxy);
app.use(express_1.default.static(path.join(__dirname, "../dist")));
new socket_io_1.Server(http);
const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
