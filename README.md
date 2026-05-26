# Email Automation Tool

This is a full-stack web application that sends emails to multiple recipients using Gmail.

## Features
- Send emails in bulk
- Simple UI using React
- Backend using Node.js and Express
- Gmail integration using App Password

## Tech Stack
- React (Frontend)
- Node.js + Express (Backend)
- Nodemailer (Email service)

## How to Run

### Backend
cd backend  
npm install  
node index.js  

Create .env file:
EMAIL_USER=your_email@gmail.com  
EMAIL_PASS=your_app_password  

### Frontend
'''bash
cd frontend/email-automation  
npm install  
npm run dev  

Open: http://localhost:5173  

## Usage
- Enter email addresses (comma separated)
- Enter subject and message
- Click "Send Emails"


## Note
Project works fully in local environment. Deployment may face limitations due to SMTP restrictions and free-tier hosting.

## Author
Aniket Jha
