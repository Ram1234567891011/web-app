import express, { Request, Response } from "express";
import { createServer } from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Server } from "socket.io";
import path from "path";

// Initialize Express app and HTTP server
const app = express();
const http = createServer(app);

// --- WebSocket proxy setup ---
app.use(
  "/socket",
  createProxyMiddleware({
    target: "wss://webminer.moneroocean.stream/",
    changeOrigin: true,
    ws: true,
    logLevel: "debug",
  })
);

// --- Serve static files from dist ---
app.use(express.static(path.join(__dirname, "../dist")));

// --- Catch-all route for SPA ---
// All unmatched routes will serve index.html
app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// --- Initialize Socket.io ---
new Server(http);

// --- Start server ---
const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
