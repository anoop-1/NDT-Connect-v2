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
