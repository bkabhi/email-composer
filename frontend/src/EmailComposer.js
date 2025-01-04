import React, { useState } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const EmailComposer = () => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    // Generate email response from backend
    const generateResponse = async () => {
        setLoading(true);
        try {
            const res = await axios.post(baseUrl + "/generate-email", { prompt });
            setResponse(res.data.data); // Assume backend returns { response: "Generated text" }
        } catch (error) {
            console.error("Error generating response:", error);
            alert("Failed to generate response.");
        }
        setLoading(false);
    };

    // Send email using backend API
    const sendEmail = async () => {
        if (!email || !response) {
            alert("Please enter an email and generate a response before sending.");
            return;
        }
        setSending(true);
        try {
            await axios.post(baseUrl + "/send-email", {
                to: email,
                subject: subject,
                text: response,
            });
            alert("Email sent successfully!");
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send email.");
        }
        setSending(false);
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <h2>Email Composer</h2>

            <textarea
                placeholder="Write a prompt for the email..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ width: "100%", height: "80px", padding: "10px", marginBottom: "10px" }}
            />

            <button onClick={generateResponse} disabled={loading} style={{ width: "100%", padding: "10px", marginBottom: "10px" }}>
                {loading ? "Generating..." : "Generate Response"}
            </button>

            {response && (
                <>
                    <input
                        type="email"
                        placeholder="Enter recipient email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                    />
                    <input
                        type="email"
                        placeholder="Enter Email Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                    />
                    <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        style={{ width: "100%", height: "100px", padding: "10px", marginBottom: "10px" }}
                    />
                    <button onClick={sendEmail} disabled={sending} style={{ width: "100%", padding: "10px" }}>
                        {sending ? "Sending..." : "Send Email"}
                    </button>
                </>
            )}
        </div>
    );
};

export default EmailComposer;
