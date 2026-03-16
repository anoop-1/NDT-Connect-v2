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
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
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
    from: 'NDT Connect <no-reply@ndt-connect.com>',
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
    from: 'NDT Connect <no-reply@ndt-connect.com>',
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

export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const verifyUrl = `${baseUrl}/api/verify?token=${token}`;

  const mailOptions = {
    from: 'NDT Connect <no-reply@ndtconnect.com>',
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
