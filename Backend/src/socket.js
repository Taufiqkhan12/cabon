import { Server } from "socket.io";
import { User } from "./models/user.model.js";
import { Captain } from "./models/captain.model.js";

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        await User.findByIdAndUpdate({ userId }, { socketId: socket.id });
      } else if (userType === "captain") {
        await Captain.findByIdAndUpdate({ userId }, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { captainId, location } = data;

      if (
        !location ||
        typeof location.ltd !== "number" ||
        typeof location.lng !== "number"
      ) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await Captain.findByIdAndUpdate(
        { captainId },
        {
          location: {
            ltd: location.ltd,
            lng: location.lng,
          },
        }
      );
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

function sendMessageToSocketId(socketId, messageObject) {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
}

export { initializeSocket, sendMessageToSocketId };
