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

export async function sendCertificationExpiryAlert(
  email: string,
  name: string,
  expiringItems: Array<{ type: 'personnel' | 'company'; name: string; level?: string; expiryDate: string }>
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ndt-connect.com';

  const itemsHtml = expiringItems.map(item => {
    const label = item.type === 'personnel'
      ? `${item.name} ${item.level || ''}`
      : item.name;
    return `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${label}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${item.type === 'personnel' ? 'Personnel Qualification' : 'Company Certification'}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #dc2626; font-weight: 600;">${new Date(item.expiryDate).toLocaleDateString()}</td>
    </tr>`;
  }).join('');

  const mailOptions = {
    from: 'NDT Connect <info@ndt-connect.com>',
    to: email,
    subject: `Action Required: ${expiringItems.length} Certification(s) Expiring Soon`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #004aad; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">NDT Connect</h1>
        </div>
        <div style="padding: 24px; background: #f8fafc;">
          <h2 style="color: #1e293b;">Certification Expiry Alert</h2>
          <p style="color: #475569;">Hi ${name},</p>
          <p style="color: #475569;">The following certifications/qualifications on your NDT Connect profile are expiring within <strong>30 days</strong>:</p>
          <table style="width: 100%; border-collapse: collapse; background: white; border: 1px solid #e2e8f0; border-radius: 8px; margin: 16px 0;">
            <thead>
              <tr style="background: #f1f5f9;">
                <th style="padding: 8px; text-align: left;">Certification</th>
                <th style="padding: 8px; text-align: left;">Type</th>
                <th style="padding: 8px; text-align: left;">Expiry Date</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <p style="color: #475569;">Please renew these certifications to maintain your compliance status and continue receiving service requests.</p>
          <a href="${baseUrl}/provider-dashboard/certifications" style="display: inline-block; background: #004aad; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Manage Certifications</a>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">You received this email because you are a registered provider on NDT Connect.</p>
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
