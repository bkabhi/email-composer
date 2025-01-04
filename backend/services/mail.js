const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your email app password
        },
    });

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    return info;
}

module.exports = { sendMail };