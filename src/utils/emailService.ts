import nodemailer from 'nodemailer';

let _transporter: any = null;

const getTransporter = () => {
  if (!_transporter) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASS) {
      console.warn('[EMAIL] ⚠️ EMAIL_USER or EMAIL_APP_PASS is missing in environment variables.');
    }
    _transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
      },
    });
  }
  return _transporter;
};

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// ── Shared email wrapper ─────────────────────────────────────────────────────
const sendMail = async (to: string, subject: string, html: string) => {
  try {
    await getTransporter().sendMail({
      from: `"Academic Task Manager 🎓" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`[EMAIL] ✅ Sent "${subject}" to ${to}`);
  } catch (err: any) {
    console.error(`[EMAIL] ❌ Failed to send "${subject}" to ${to}: ${err.message}`);
    // Never rethrow — email failures should not crash the app
  }
};

// ── Shared HTML wrapper ──────────────────────────────────────────────────────
const wrapHtml = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Academic Task Manager</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#18181b 0%,#27272a 100%);padding:28px 36px;">
            <h1 style="margin:0;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Academic Task Manager</h1>
            <p style="margin:4px 0 0;font-size:12px;color:#a1a1aa;font-weight:600;letter-spacing:1px;text-transform:uppercase;">VSBEC Academic Platform</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#fafafa;border-top:1px solid #f0f0f0;padding:20px 36px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#a1a1aa;">
              You received this email because you are registered on the VSBEC Academic Task Manager.
              <br/>This is an automated message — please do not reply.
            </p>
            <p style="margin:8px 0 0;font-size:11px;color:#a1a1aa;">
              <a href="${CLIENT_URL}" style="color:#6366f1;text-decoration:none;font-weight:600;">Open Task Manager →</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`;

// ── 1. Welcome Email ─────────────────────────────────────────────────────────
export const sendWelcomeEmail = async (to: string, name: string, role: string) => {
  const roleLabel: Record<string, string> = {
    STUDENT: 'Student',
    CLASS_ADVISOR: 'Class Advisor',
    HOD: 'Head of Department',
    SUPREME_ADMIN: 'System Administrator',
  };

  const content = `
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#18181b;">Welcome, ${name}! 👋</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#71717a;">Your account has been created on the VSBEC Academic Task Management System.</p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb;border:1px solid #e4e4e7;border-radius:12px;padding:20px;margin-bottom:28px;">
      <tr>
        <td>
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:.5px;">Account Details</p>
          <p style="margin:0 0 4px;font-size:14px;color:#3f3f46;"><strong>Name:</strong> ${name}</p>
          <p style="margin:0;font-size:14px;color:#3f3f46;"><strong>Role:</strong> ${roleLabel[role] || role}</p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 20px;font-size:14px;color:#52525b;line-height:1.6;">
      You can now log in and access your dashboard to view tasks, track submissions, and stay on top of academic activities. Your initial login credentials were provided by your administrator.
    </p>

    <p style="margin:0 0 28px;font-size:14px;font-weight:700;color:#ef4444;">
      🔒 For security, please change your password after your first login.
    </p>

    <a href="${CLIENT_URL}" style="display:inline-block;background:#18181b;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:10px;">
      Go to Dashboard →
    </a>
  `;

  await sendMail(to, `Welcome to Academic Task Manager, ${name}!`, wrapHtml(content));
};

// ── 2. Task Assignment Email ─────────────────────────────────────────────────
export const sendTaskAssignmentEmail = async (
  to: string,
  studentName: string,
  taskTitle: string,
  taskDescription: string,
  dueDate: string | null,
  assignedBy: string
) => {
  const dueDateDisplay = dueDate
    ? new Date(dueDate).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })
    : 'No deadline set';

  const content = `
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#18181b;">New Task Assigned 📋</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#71717a;">Hi ${studentName}, a new task has been assigned to you.</p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb;border:1px solid #e4e4e7;border-radius:12px;padding:20px;margin-bottom:24px;">
      <tr>
        <td>
          <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:.5px;">Task Details</p>
          <p style="margin:0 0 8px;font-size:18px;font-weight:800;color:#18181b;">${taskTitle}</p>
          <p style="margin:0 0 16px;font-size:14px;color:#52525b;line-height:1.6;">${taskDescription}</p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="50%" style="padding-right:8px;">
                <div style="background:#ffffff;border:1px solid #e4e4e7;border-radius:8px;padding:12px;">
                  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;">Assigned By</p>
                  <p style="margin:0;font-size:13px;font-weight:700;color:#3f3f46;">${assignedBy}</p>
                </div>
              </td>
              <td width="50%" style="padding-left:8px;">
                <div style="background:#ffffff;border:1px solid #e4e4e7;border-radius:8px;padding:12px;">
                  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;">Deadline</p>
                  <p style="margin:0;font-size:13px;font-weight:700;color:#ef4444;">${dueDateDisplay}</p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 24px;font-size:14px;color:#52525b;line-height:1.6;">
      Log in to the platform to view your task, upload your proof screenshot, and submit before the deadline.
    </p>

    <a href="${CLIENT_URL}" style="display:inline-block;background:#6366f1;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:10px;">
      View Task & Submit →
    </a>
  `;

  await sendMail(to, `New Task: ${taskTitle}`, wrapHtml(content));
};

// ── 3. Deadline Reminder Email ───────────────────────────────────────────────
export const sendDeadlineReminderEmail = async (
  to: string,
  studentName: string,
  taskTitle: string,
  dueDate: string,
  hoursLeft: number
) => {
  const isUrgent = hoursLeft <= 24;
  const accentColor = isUrgent ? '#ef4444' : '#f97316';
  const urgencyLabel = isUrgent ? '🔴 URGENT — Due in less than 24 hours!' : '🟠 Reminder — Due in less than 48 hours';
  const dueDateDisplay = new Date(dueDate).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' });

  const content = `
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#18181b;">Deadline Reminder ⏰</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#71717a;">Hi ${studentName}, this is a reminder about an upcoming task deadline.</p>

    <div style="background:${accentColor}10;border:2px solid ${accentColor};border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0;font-size:14px;font-weight:700;color:${accentColor};">${urgencyLabel}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb;border:1px solid #e4e4e7;border-radius:12px;padding:20px;margin-bottom:24px;">
      <tr>
        <td>
          <p style="margin:0 0 8px;font-size:18px;font-weight:800;color:#18181b;">${taskTitle}</p>
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:.5px;">Deadline</p>
          <p style="margin:0;font-size:16px;font-weight:700;color:${accentColor};">${dueDateDisplay}</p>
          <p style="margin:8px 0 0;font-size:13px;color:#52525b;font-weight:600;">
            ⏱ ${Math.round(hoursLeft)} hour${hoursLeft !== 1 ? 's' : ''} remaining
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 24px;font-size:14px;color:#52525b;line-height:1.6;">
      If you have already submitted this task, you can ignore this email. Otherwise, please log in and submit your proof screenshot before the deadline passes.
    </p>

    <a href="${CLIENT_URL}" style="display:inline-block;background:${accentColor};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:10px;">
      Submit Now →
    </a>
  `;

  await sendMail(to, `⏰ Deadline Reminder: ${taskTitle}`, wrapHtml(content));
};
