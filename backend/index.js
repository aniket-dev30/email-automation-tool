const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
}
});

app.post("/send-email", upload.single("resume"), async (req, res) => {
  const { emails, subject, message } = req.body;

  const emailList = emails.split(",");

  try {
    for (let email of emailList) {
      await transporter.sendMail({
        from: '"Aniket Automation Tool" <ani30jha@gmail.com>',
        to: email.trim(),
        subject: subject,
        text: message,

        // ✅ FIXED ATTACHMENT LOGIC
        attachments: req.file
          ? [
              {
                filename: req.file.originalname, // ✅ real file name
                path: req.file.path,
              },
            ]
          : [],
      });
    }

    res.send("Emails sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending emails");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));