import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function testEmail() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASS,
        },
    });

    try {
        console.log('Attempting to send test email...');
        await transporter.sendMail({
            from: `"Task Manager Test 🧪" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'Email System Verification ✅',
            html: `
        <h1>It Works! 🚀</h1>
        <p>This is a verification email from the <b>Academic Task Management System</b>.</p>
        <p>If you see this, your Gmail SMTP credentials (App Password) are correct and the system is ready to send notifications.</p>
      `,
        });
        console.log('✅ Success! Test email sent to ' + process.env.EMAIL_USER);
    } catch (err) {
        console.error('❌ Failed to send email:', err);
    }
}

testEmail();
