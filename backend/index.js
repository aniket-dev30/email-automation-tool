require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({ origin: "*" }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// multer middleware added to parse FormData including optional file
app.post("/send-email", upload.single("resume"), async (req, res) => {
  const { emails, subject, message } = req.body;

  if (!emails || !subject || !message) {
    return res.status(400).send("All fields are required");
  }

  const emailList = emails.split(",");

  const mailOptions = {
    from: `"Aniket Automation Tool" <${process.env.EMAIL_USER}>`,
    subject,
    text: message,
  };

  if (req.file) {
    mailOptions.attachments = [
      {
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype,
      },
    ];
  }

  try {
    await Promise.all(
      emailList.map((email) =>
        transporter.sendMail({ ...mailOptions, to: email.trim() })
      )
    );
    res.send("Emails sent successfully 🚀");
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).send("Error sending emails: " + error.message);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});