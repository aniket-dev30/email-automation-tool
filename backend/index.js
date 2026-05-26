require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Check env variables
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

// ✅ transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ test route
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

app.post("/send-email", async (req, res) => {
  const { emails, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emails,
      subject: subject,
      text: message,
    });

    res.send("Email sent ✅");
  } catch (error) {
    console.log("FULL ERROR:", error); // VERY IMPORTANT
    res.status(500).send("Failed to send email");
  }
});

app.listen(5000, () => console.log("Server running"));