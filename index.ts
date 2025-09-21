import express from "express";
import { createServer } from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// __dirname workaround for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const http = createServer(app);

const socketProxy = createProxyMiddleware({
  target: "wss://webminer.moneroocean.stream/",
  changeOrigin: true,
  ws: true,
  logLevel: "debug",
});

app.use("/socket", socketProxy);
app.use(express.static(path.join(__dirname, "../dist")));

new Server(http);

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
