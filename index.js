"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
// __dirname workaround for ESM
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
const app = (0, express_1.default)();
const http = (0, http_1.createServer)(app);
const socketProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: "wss://webminer.moneroocean.stream/",
    changeOrigin: true,
    ws: true,
    logLevel: "debug",
});
app.use("/socket", socketProxy);
app.use(express_1.default.static(path_1.default.join(__dirname, "../dist")));
new socket_io_1.Server(http);
const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
