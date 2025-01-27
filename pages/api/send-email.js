// pages/api/send-email.js
import resend from '../../src/lib/resend';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

export default async function handler(req, res) { //  this is not being used
  if (req.method === 'POST') {
    const { to, subject, firstName, orderNumber, mainItemName, total} = req.body;

    // Read and compile the HTML template
    const templatePath = path.resolve('./src/htmlEmailTemplates/mainTemplate.html');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(templateSource);

    // Prepare the HTML with dynamic data
    const htmlContent = template({ firstName, orderNumber, mainItemName, total});

    try {
      const response = await resend.emails.send({
        from: 'onboarding@resend.dev',  // Use your verified email address
        to,
        subject,
        html: htmlContent  // Use the compiled HTML template with dynamic data
      });

      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}


