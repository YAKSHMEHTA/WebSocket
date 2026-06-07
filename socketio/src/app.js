import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("msgFromBackend", `${socket.id}  Hello from backend`);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
