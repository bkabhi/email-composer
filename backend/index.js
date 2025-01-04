const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const { getGroqRes } = require("./services/groq");
const { sendMail } = require("./services/mail");
// const mongoose = require("mongoose");
require("dotenv").config();

// Enable CORS for all routes
const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
// .catch(err => console.log(err));

// // Define a simple User schema
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });
// const User = mongoose.model("User", UserSchema);

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to the Node.js API");
});

// Get email response
app.post("/generate-email", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await getGroqRes(prompt);
        return res.status(200).json({ data: response, message: "Success"});
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

// Send a mail
app.post("/send-email", async (req, res) => {
    try {
      const { to, subject, text } = req.body;
  
      // Send email
      const response = await sendMail(to, subject, text);
  
      res.status(200).json({ message: "Email sent successfully", response });
    } catch (error) {
      res.status(500).json({ message: "Error sending email", error });
    }
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
