import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectMongoDb from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import aiRoutes from "./routes/ai.route.js";
import cloudStorageRoutes from "./routes/cloudStorage.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

dotenv.config(); // to access the .env file
app.use(cors()); //to allow cross-origin requests
app.use(express.json()); //to accept json data
app.use(cookieParser());//to parse cookies

const PORT = process.env.PORT || 8000;

//For Deploymennt Purpose
const __dirname = path.resolve();

// Accessing Different Routes 
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/fileuploadtocloud", cloudStorageRoutes)

//For Deployment Purpose
app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

server.listen(PORT, () => {
    connectMongoDb();
    console.log(`Server started on port ${PORT}`);
})