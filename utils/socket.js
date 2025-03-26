const socketIO = require("socket.io");

let io;

const initializeSocket = (server) => {
    io = socketIO(server);

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        setTimeout(() => {
        socket.emit("welcome", "Hello User");
        socket.emit("staffMemberChanged", "try");
        io.to(socket.id).emit("staffMemberChanged", "Working here");
        }, 2000);

        socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data);
        });

        socket.on("staffMemberChanged", (data) => {
        io.emit("staffMemberChanged", data);
        });

        socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        });
    });

    console.log("✅ Socket.io initialized");
};

// Function to emit events from anywhere
const triggerSocket = (socketPath, message) => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    io.emit(socketPath, message);
};

module.exports = { initializeSocket, triggerSocket };
