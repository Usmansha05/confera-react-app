import dotenv from 'dotenv';
import express from "express";
import { createServer } from "node:http";
dotenv.config();

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors({
  origin: ["http://localhost:3000", "https://confera.onrender.com"],
  credentials: true
}));
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    const mongoURI = process.env.MONGO_URI || "mongodb+srv://<username>:<password>@cluster0.e7wnrhm.mongodb.net/Confera?retryWrites=true&w=majority";
    try {
        const connectionDb = await mongoose.connect(mongoURI);
        console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
        server.listen(app.get("port"), () => {
            console.log("LISTENING ON PORT 8000");
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}



start();