import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Route for home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB Error:", err));

// Schema for contact form
const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  inquiryType: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", MessageSchema);

// API endpoint for contact form
app.post("/contact", async (req, res) => {
  try {
    const newMsg = new Message(req.body);
    await newMsg.save();
    res.status(200).json({ message: "Form saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving form data" });
  }
});

// Admin route to fetch all messages
app.get("/admin/messages", async (req, res) => {
  try {
    const allMessages = await Message.find().sort({ date: -1 }); // latest first
    res.json(allMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cannot fetch messages" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
