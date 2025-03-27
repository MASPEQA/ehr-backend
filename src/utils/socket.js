const socketIO = require("socket.io");

let io;

const initializeSocket = (server) => {
    io = socketIO(server);

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        });
    });

    console.log("Socket.io initialized");
};

// Function to emit events from anywhere
const triggerSocket = (socketPath, message) => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    io.emit(socketPath, message);
};

module.exports = { initializeSocket, triggerSocket };
