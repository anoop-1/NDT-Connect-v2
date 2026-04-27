import nodemailer from 'nodemailer';

let testAccount: any = null;
let transporter: nodemailer.Transporter;

async function getTransporter() {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    if (process.env.SMTP_USEGMAIL) {
      console.log("Using TEST -> Sending email as dev");
      return transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "login",
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      console.log("Using PROD -> Sending email as prod");    
      const port = parseInt(process.env.SMTP_PORT || '465');
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    }
  } else {
    // Use Ethereal for dev
    if (!testAccount) testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }
}

export async function sendServiceRequestNotification(
  providerEmail: string,
  providerName: string,
  request: {
    serviceType: string;
    location: string;
    description: string;
    clientName: string;
    requestId: string;
  }
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ndt-connect.com';

  const mailOptions = {
    from: 'NDT Connect <info@ndt-connect.com>',
    to: providerEmail,
    subject: `New Service Request: ${request.serviceType} in ${request.location}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #004aad; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">NDT Connect</h1>
        </div>
        <div style="padding: 24px; background: #f8fafc;">
          <h2 style="color: #1e293b;">New Service Request</h2>
          <p style="color: #475569;">Hi ${providerName},</p>
          <p style="color: #475569;">You have received a new inspection request on NDT Connect:</p>
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p><strong>Service:</strong> ${request.serviceType}</p>
            <p><strong>Location:</strong> ${request.location}</p>
            <p><strong>Client:</strong> ${request.clientName}</p>
            <p><strong>Description:</strong> ${request.description.substring(0, 200)}${request.description.length > 200 ? '...' : ''}</p>
          </div>
          <a href="${baseUrl}/provider-dashboard" style="display: inline-block; background: #004aad; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">View Request</a>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">You received this email because you are a registered provider on NDT Connect.</p>
        </div>
      </div>
    `,
  };

  const t = await getTransporter();
  await t.sendMail(mailOptions);
}

export async function sendRequestStatusUpdate(
  clientEmail: string,
  clientName: string,
  request: { serviceType: string; status: string; providerName: string | null; requestId: string }
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ndt-connect.com';

  const mailOptions = {
    from: 'NDT Connect <info@ndt-connect.com>',
    to: clientEmail,
    subject: `Request Update: ${request.serviceType} — ${request.status}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #004aad; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">NDT Connect</h1>
        </div>
        <div style="padding: 24px; background: #f8fafc;">
          <h2 style="color: #1e293b;">Request Status Update</h2>
          <p style="color: #475569;">Hi ${clientName},</p>
          <p style="color: #475569;">Your service request for <strong>${request.serviceType}</strong> has been updated:</p>
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p><strong>Status:</strong> ${request.status}</p>
            ${request.providerName ? `<p><strong>Provider:</strong> ${request.providerName}</p>` : ''}
          </div>
          <a href="${baseUrl}/track-request/${request.requestId}" style="display: inline-block; background: #004aad; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Track Request</a>
        </div>
      </div>
    `,
  };

  const t = await getTransporter();
  await t.sendMail(mailOptions);
}

export async function sendCalibrationAlert(
  emailTo: string,
  equipmentName: string,
  serialNumber: string,
  dueDate: string | Date,
  daysRemaining: number
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ndt-connect.com';
  const dueStr = new Date(dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const overdue = daysRemaining < 0;
  const status = overdue
    ? `Overdue by ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) === 1 ? '' : 's'}`
    : daysRemaining === 0
      ? 'Due today'
      : `Due in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}`;
  const accent = overdue ? '#dc2626' : daysRemaining <= 7 ? '#ea580c' : '#004aad';
  const subject = overdue
    ? `OVERDUE: Calibration for ${equipmentName} (S/N ${serialNumber})`
    : `Calibration Reminder: ${equipmentName} ${status.toLowerCase()}`;

  const mailOptions = {
    from: 'NDT Connect <info@ndt-connect.com>',
    to: emailTo,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #004aad; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">NDT Connect</h1>
        </div>
        <div style="padding: 24px; background: #f8fafc;">
          <h2 style="color: #1e293b; margin-top: 0;">Equipment Calibration Reminder</h2>
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Equipment:</strong> ${equipmentName}</p>
            <p style="margin: 0 0 8px 0;"><strong>Serial Number:</strong> ${serialNumber}</p>
            <p style="margin: 0 0 8px 0;"><strong>Calibration Due:</strong> ${dueStr}</p>
            <p style="margin: 0; color: ${accent}; font-weight: 600;"><strong>Status:</strong> ${status}</p>
          </div>
          <p style="color: #475569;">Please schedule a calibration to keep this instrument compliant with ASNT, ISO, and customer requirements.</p>
          <a href="${baseUrl}/provider-dashboard/calibration" style="display: inline-block; background: #004aad; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Open Calibration Dashboard</a>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">You receive this email because a calibration alert is enabled for this equipment on NDT Connect.</p>
        </div>
      </div>
    `,
  };

  const t = await getTransporter();
  await t.sendMail(mailOptions);
}

export async function sendPasswordSetupEmail(email: string, name: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ndt-connect.com';
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  const mailOptions = {
    from: 'NDT Connect <info@ndt-connect.com>',
    to: email,
    subject: 'Set up your NDT Connect password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(160deg, #0B1E33 0%, #003680 60%, #004AAD 100%); padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 26px; font-weight: 700;">NDT Connect</h1>
        </div>
        <div style="padding: 32px; background: #f8fafc;">
          <h2 style="color: #1e293b; margin-top: 0;">Welcome back, ${name}!</h2>
          <p style="color: #475569; line-height: 1.6;">
            Your NDT Connect account has been restored. Click the button below to set your new password and access your account — it only takes a minute.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" style="display: inline-block; background: #004aad; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">Set My Password</a>
          </div>
          <p style="color: #94a3b8; font-size: 13px;">This link expires in 24 hours. If you didn't request this, you can ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">NDT Connect — The NDT Marketplace</p>
        </div>
      </div>
    `,
  };

  const t = await getTransporter();
  await t.sendMail(mailOptions);
}

export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const verifyUrl = `${baseUrl}/api/verify?token=${token}`;

  const mailOptions = {
    from: 'NDT Connect <info@ndt-connect.com>',
    to: email,
    subject: 'Verify your NDT Connect account',
    html: `<p>Thank you for registering with NDT Connect!</p>
           <p>Please verify your email by clicking the link below:</p>
           <a href="${verifyUrl}">${verifyUrl}</a>
           <p>If you did not register, you can ignore this email.</p>`
  };

  const t = await getTransporter();
  const info = await t.sendMail(mailOptions);

  if (testAccount) {
    console.log('Ethereal test email sent!');
    console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    console.log('Login to Ethereal:', testAccount.user, testAccount.pass);
  }
}
