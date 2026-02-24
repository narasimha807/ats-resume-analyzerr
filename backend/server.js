import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import resumeRoutes from "./routes/resumeRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection (robust)
mongoose.set('strictQuery', false);

const mongoURI = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : null;
if (!mongoURI) {
  console.error("Missing MONGO_URI in environment. Set MONGO_URI in .env.");
  process.exit(1);
}

async function connectDB() {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error("Ensure MongoDB is running and MONGO_URI is correct.");
    process.exit(1);
  }
}

connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/resume", resumeRoutes);

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
