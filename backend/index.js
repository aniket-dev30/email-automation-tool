require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// ✅ CORS (allow all for now)
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Health check route (important for Render)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Send Email API (NO FILE UPLOAD — stable version)
app.post("/send-email", async (req, res) => {
  const { emails, subject, message } = req.body;

  // ✅ validation
  if (!emails || !subject || !message) {
    return res.status(400).send("All fields are required");
  }

  const emailList = emails.split(",");

  try {
    // ✅ FAST parallel sending (prevents timeout)
    await Promise.all(
      emailList.map((email) =>
        transporter.sendMail({
          from: `"Aniket Automation Tool" <${process.env.EMAIL_USER}>`,
          to: email.trim(),
          subject: subject,
          text: message,
        })
      )
    );

    res.send("Emails sent successfully 🚀");
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    res.status(500).send("Error sending emails");
  }
});

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});