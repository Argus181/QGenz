import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);

// Get support email from environment variables
const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || 'your_verified_email@example.com';

export const sendSupportReply = async (to, reply, originalMessage) => {
  try {
    const msg = {
      to,
      from: {
        email: SUPPORT_EMAIL,
        name: 'Qgenz Support'
      },
      subject: 'Reply to your support request - Qgenz',
      text: `Dear ${originalMessage.name},\n\nThank you for contacting Qgenz support. Here is our reply to your message:\n\n"${originalMessage.message}"\n\nOur response:\n${reply}\n\nBest regards,\nQgenz Support Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Qgenz Support Reply</h2>
          <p>Dear ${originalMessage.name},</p>
          <p>Thank you for contacting Qgenz support. Here is our reply to your message:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Your message:</strong></p>
            <p>${originalMessage.message}</p>
          </div>
          <div style="background-color: #eef2ff; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Our response:</strong></p>
            <p>${reply}</p>
          </div>
          <p>Best regards,<br>Qgenz Support Team</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export const sendSupportConfirmation = async (to, name) => {
  try {
    const msg = {
      to,
      from: {
        email: SUPPORT_EMAIL,
        name: 'Qgenz Support'
      },
      subject: 'Support Request Received - Qgenz',
      text: `Dear ${name},\n\nThank you for contacting Qgenz support. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nQgenz Support Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Support Request Received</h2>
          <p>Dear ${name},</p>
          <p>Thank you for contacting Qgenz support. We have received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Qgenz Support Team</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error.message };
  }
}; 