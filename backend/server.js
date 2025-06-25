const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // ✅ Fixes CORS issues
app.use(express.json()); // ✅ Enables JSON body parsing

// Test API route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Import and use routes
const notesRoutes = require("./routes/noteRoutes"); // Ensure this route file exists
app.use("/api/notes", notesRoutes); // ✅ Your frontend calls this

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
