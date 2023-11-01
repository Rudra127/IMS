import nodemailer from 'nodemailer';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import path from 'path'; // Import the path module

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'teamsquare678@gmail.com',
    pass: 'hgdc zgag ktrg exri',
  },
});

function sendEmail(to, subject, text, html) {
  const mailOptions = {
    from: 'teamsquare678@gmail.com',
    to,
    subject,
    text,
    html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
}

async function sendRegistrationConfirmationEmail(employeeEmail) {
  const subject = 'Registration Confirmation';
  const text = 'Thank you for registering. Your registration has been received and is pending approval.';
  
  // const html = fs.readFileSync(path.join(__dirname, 'registrationconfirm.html'), 'utf8');

  try {
    const response = await sendEmail(employeeEmail, subject, text, html);
    console.log('Email sent: ' + response);
  } catch (error) {
    console.error(error);
    throw new Error('Email could not be sent');
  }
}

async function sendApprovalNotificationEmail(managerEmail, employeeEmail) {
  const subject = 'Registration Approval';
  const text = `The registration for ${employeeEmail} has been approved.`;
  // const html = fs.readFileSync(path.join(__dirname, 'registrationconfirm.html'), 'utf8');

  try {
    const response = await sendEmail(managerEmail, subject, text, html);
    console.log('Email sent: ' + response);
  } catch (error) {
    console.error(error);
    throw new Error('Email could not be sent');
  }
}

async function sendDeclineNotificationEmail(managerEmail, employeeEmail) {
  const subject = 'Registration Decline';
  const text = `The registration for ${employeeEmail} has been declined.`;

  try {
    const response = await sendEmail(managerEmail, subject, text);
    console.log('Email sent: ' + response);
  } catch (error) {
    console.error(error);
    throw new Error('Email could not be sent');
  }
}

export {
  sendRegistrationConfirmationEmail,
  sendApprovalNotificationEmail,
  sendDeclineNotificationEmail,
};
