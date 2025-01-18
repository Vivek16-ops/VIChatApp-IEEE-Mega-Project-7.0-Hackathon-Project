import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

export const getRecieverSocketID = (recieverID) => {
    return userSocketMap[recieverID];
}

// {userID:socketId}
const userSocketMap = {};

io.on("connection", (socket) => {
    const userID = socket.handshake.query.userID;
    if (userID != "undefined") userSocketMap[userID] = socket.id;

    //io.emeit() is used to send event to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    //socket.on is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
        delete userSocketMap[userID];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server }