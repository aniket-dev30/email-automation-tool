import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emails || !subject || !message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("emails", emails);
    formData.append("subject", subject);
    formData.append("message", message);

    if (resume) {
      formData.append("resume", resume);
    }

    try {
      const res = await axios.post(
        "https://email-automation-tool-0ng9.onrender.com/send-email",
        formData
      );

      alert(res.data);

      // clear form
      setEmails("");
      setSubject("");
      setMessage("");
      setResume(null);

    } catch (err) {
      alert(err.response?.data || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Recruiter Email Automation Tool</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Enter emails (comma separated)"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />

          <input
            className="input"
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            className="input"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            className="file"
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
          />

          <button className="btn" type="submit">
            {loading ? "Sending..." : "Send Emails 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;