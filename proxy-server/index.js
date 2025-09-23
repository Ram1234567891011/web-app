"use strict";

// Import modules
const express = require("express");
const { createServer } = require("http");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { Server } = require("socket.io");
const path = require("path");

// Initialize Express app and HTTP server
const app = express();
const http = createServer(app);

// --- WebSocket proxy setup ---
app.use(
  "/socket",
  createProxyMiddleware({
    target: "https://moneroocean.stream/",
    changeOrigin: true,
    ws: true,
    logLevel: "debug",
  })
);

// --- Serve static files from dist ---
app.use(express.static(path.join(__dirname, "../dist")));

// --- Catch-all route for SPA ---
// All unmatched routes will serve index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// --- Initialize Socket.io ---
new Server(http);

// --- Start server ---
const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
