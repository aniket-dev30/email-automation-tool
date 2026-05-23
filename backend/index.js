require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");

const app = express();

// ✅ better CORS
app.use(cors({ origin: "*" }));
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ health check route (VERY IMPORTANT FOR RENDER)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/send-email", upload.single("resume"), async (req, res) => {
  const { emails, subject, message } = req.body;

  // ✅ validation
  if (!emails || !subject || !message) {
    return res.status(400).send("All fields are required");
  }

  const emailList = emails.split(",");

  try {
    for (let email of emailList) {
      await transporter.sendMail({
        // ✅ use env email (IMPORTANT FIX)
        from: `"Aniket Automation Tool" <${process.env.EMAIL_USER}>`,
        to: email.trim(),
        subject: subject,
        text: message,

        attachments: req.file
          ? [
              {
                filename: req.file.originalname,
                path: req.file.path,
              },
            ]
          : [],
      });
    }

    res.send("Emails sent successfully 🚀");
  } catch (error) {
    console.log("EMAIL ERROR:", error); // ✅ better debugging
    res.status(500).send("Error sending emails");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));