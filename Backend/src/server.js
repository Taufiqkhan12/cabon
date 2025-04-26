import http from "http";
import { app } from "./app.js";
import { initializeSocket } from "./socket.js";

const server = http.createServer(app);

const port = process.env.PORT || 3000;

initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
