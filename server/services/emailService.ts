import nodemailer from 'nodemailer';
import { z } from 'zod';

// Validation schema for inquiry data
const InquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  quantity: z.string().optional(),
  urgency: z.string().optional(),
  message: z.string().optional(),
  product: z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    selectedVariants: z.record(z.string())
  }).optional(),
  timestamp: z.string(),
  type: z.enum(["product", "general"])
});

type InquiryData = z.infer<typeof InquirySchema>;

// Email configuration interface
interface EmailConfig {
  gmailUser: string;
  gmailPass: string;
  ownerEmail: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private config: EmailConfig | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    try {
      // Get email configuration from environment variables
      const gmailUser = "kishankachhadiya42@gmail.com";
      const gmailPass = "nllv zpqr phcl cslg";
      const ownerEmail = "kishankachhadiya42@gmail.com";

      if (!gmailUser || !gmailPass || !ownerEmail) {
        console.warn('Email service not configured. Missing environment variables:');
        if (!gmailUser) console.warn('- GMAIL_USER is not set');
        if (!gmailPass) console.warn('- GMAIL_PASS is not set');
        if (!ownerEmail) console.warn('- OWNER_EMAIL is not set');
        return;
      }

      this.config = { gmailUser, gmailPass, ownerEmail };

      // Create transporter with Gmail SMTP
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: gmailUser,
          pass: gmailPass, // App password, not regular password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      console.log('Email service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize email service:', error);
    }
  }

  /**
   * Send inquiry notification email to the owner
   */
  async sendInquiryNotification(inquiry: InquiryData): Promise<boolean> {
    if (!this.transporter || !this.config) {
      console.warn('Email service not configured. Inquiry email not sent.');
      return false;
    }

    try {
      const subject = this.generateSubject(inquiry);
      const htmlContent = this.generateHtmlContent(inquiry);
      const textContent = this.generateTextContent(inquiry);

      const mailOptions = {
        from: {
          name: 'Kenayo Jewels Website',
          address: this.config.gmailUser
        },
        to: this.config.ownerEmail,
        subject: subject,
        text: textContent,
        html: htmlContent,
        replyTo: inquiry.email // Allow owner to reply directly to customer
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Inquiry notification email sent successfully:', result.messageId);
      return true;

    } catch (error) {
      console.error('Failed to send inquiry notification email:', error);
      return false;
    }
  }

  /**
   * Send confirmation email to the customer
   */
  async sendCustomerConfirmation(inquiry: InquiryData): Promise<boolean> {
    if (!this.transporter || !this.config) {
      console.warn('Email service not configured. Confirmation email not sent.');
      return false;
    }

    try {
      const subject = 'Thank you for your inquiry - Kenayo Jewels';
      const htmlContent = this.generateCustomerConfirmationHtml(inquiry);
      const textContent = this.generateCustomerConfirmationText(inquiry);

      const mailOptions = {
        from: {
          name: 'Kenayo Jewels',
          address: this.config.gmailUser
        },
        to: inquiry.email,
        subject: subject,
        text: textContent,
        html: htmlContent
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Customer confirmation email sent successfully:', result.messageId);
      return true;

    } catch (error) {
      console.error('Failed to send customer confirmation email:', error);
      return false;
    }
  }

  /**
   * Test email configuration
   */
  async testConnection(): Promise<boolean> {
    if (!this.transporter) {
      console.error('Email transporter not initialized');
      return false;
    }

    try {
      await this.transporter.verify();
      console.log('Email connection test successful');
      return true;
    } catch (error) {
      console.error('Email connection test failed:', error);
      return false;
    }
  }

  private generateSubject(inquiry: InquiryData): string {
    if (inquiry.type === 'product' && inquiry.product) {
      return `🔔 New Product Inquiry: ${inquiry.product.name} - ${inquiry.name}`;
    }
    return `🔔 New General Inquiry - ${inquiry.name} from ${inquiry.company}`;
  }

  private generateHtmlContent(inquiry: InquiryData): string {
    const timestamp = new Date(inquiry.timestamp).toLocaleString();
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e40af 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .section { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #1e3a8a; }
        .label { font-weight: bold; color: #1e3a8a; }
        .value { margin-left: 10px; }
        .product-info { background: #e3f2fd; padding: 15px; border-radius: 5px; }
        .variants { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .variant-tag { background: #1e3a8a; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; background: #f1f3f4; border-radius: 5px; }
        .urgent { background: #fff3cd; border-color: #ffc107; }
        .high-priority { color: #dc3545; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔔 New Inquiry - Kenayo Jewels</h1>
            <p>A new inquiry has been submitted through your website</p>
        </div>

        <div class="section">
            <h3>👤 Customer Information</h3>
            <p><span class="label">Name:</span><span class="value">${inquiry.name}</span></p>
            <p><span class="label">Company:</span><span class="value">${inquiry.company}</span></p>
            <p><span class="label">Email:</span><span class="value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></span></p>
            <p><span class="label">Phone:</span><span class="value">${inquiry.phone || 'Not provided'}</span></p>
            <p><span class="label">Submitted:</span><span class="value">${timestamp}</span></p>
        </div>

        ${inquiry.type === 'product' && inquiry.product ? `
        <div class="section product-info">
            <h3>💎 Product Inquiry Details</h3>
            <p><span class="label">Product:</span><span class="value">${inquiry.product.name}</span></p>
            <p><span class="label">Category:</span><span class="value">${inquiry.product.category}</span></p>
            <p><span class="label">Product ID:</span><span class="value">${inquiry.product.id}</span></p>
            
            ${Object.keys(inquiry.product.selectedVariants).length > 0 ? `
            <p><span class="label">Selected Options:</span></p>
            <div class="variants">
                ${Object.entries(inquiry.product.selectedVariants)
                  .map(([key, value]) => `<span class="variant-tag">${key}: ${value}</span>`)
                  .join('')}
            </div>
            ` : ''}
        </div>
        ` : ''}

        <div class="section ${inquiry.urgency === 'urgent' ? 'urgent' : ''}">
            <h3>📋 Order Details</h3>
            <p><span class="label">Quantity:</span><span class="value">${inquiry.quantity || 'Not specified'}</span></p>
            <p><span class="label">Urgency:</span><span class="value ${inquiry.urgency === 'urgent' ? 'high-priority' : ''}">${inquiry.urgency || 'Not specified'}</span></p>
        </div>

        ${inquiry.message ? `
        <div class="section">
            <h3>💬 Customer Message</h3>
            <p style="white-space: pre-wrap;">${inquiry.message}</p>
        </div>
        ` : ''}

        <div class="footer">
            <p><strong>⏰ Response Required</strong></p>
            <p>Please respond to this inquiry within 24 hours to maintain service standards.</p>
            <p>Reply directly to this email to contact the customer.</p>
        </div>
    </div>
</body>
</html>
    `;
  }

  private generateTextContent(inquiry: InquiryData): string {
    const timestamp = new Date(inquiry.timestamp).toLocaleString();
    
    let content = `
NEW INQUIRY - KENAYO JEWELS
===============================

Customer Information:
- Name: ${inquiry.name}
- Company: ${inquiry.company}
- Email: ${inquiry.email}
- Phone: ${inquiry.phone || 'Not provided'}
- Submitted: ${timestamp}

`;

    if (inquiry.type === 'product' && inquiry.product) {
      content += `
Product Inquiry Details:
- Product: ${inquiry.product.name}
- Category: ${inquiry.product.category}
- Product ID: ${inquiry.product.id}

Selected Options:
${Object.entries(inquiry.product.selectedVariants)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join('\n') || 'None selected'}

`;
    }

    content += `
Order Details:
- Quantity: ${inquiry.quantity || 'Not specified'}
- Urgency: ${inquiry.urgency || 'Not specified'}

`;

    if (inquiry.message) {
      content += `
Customer Message:
${inquiry.message}

`;
    }

    content += `
===============================
Please respond within 24 hours to maintain service standards.
Reply directly to this email to contact the customer.
`;

    return content.trim();
  }

  private generateCustomerConfirmationHtml(inquiry: InquiryData): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e40af 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
        .content { padding: 20px; background: #f8f9fa; border-radius: 8px; }
        .footer { text-align: center; margin-top: 20px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Thank You, ${inquiry.name}!</h1>
            <p>Your inquiry has been received</p>
        </div>
        
        <div class="content">
            <p>Dear ${inquiry.name},</p>
            
            <p>Thank you for your interest in Kenayo Jewels. We have received your inquiry and our team will review it carefully.</p>
            
            ${inquiry.type === 'product' && inquiry.product ? `
            <p><strong>Product Inquiry:</strong> ${inquiry.product.name}</p>
            ` : ''}
            
            <p><strong>What happens next:</strong></p>
            <ul>
                <li>Our team will review your inquiry within 24 hours</li>
                <li>We'll prepare a detailed response with information and availability</li>
                <li>You'll receive a personalized quote and recommendations</li>
            </ul>
            
            <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
            
            <p>Best regards,<br>
            <strong>The Kenayo Jewels Team</strong></p>
        </div>
        
        <div class="footer">
            <p>This is an automated confirmation. Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
    `;
  }

  private generateCustomerConfirmationText(inquiry: InquiryData): string {
    return `
Thank you, ${inquiry.name}!

Your inquiry has been received and our team will review it within 24 hours.

${inquiry.type === 'product' && inquiry.product ? `Product Inquiry: ${inquiry.product.name}` : ''}

What happens next:
- Our team will review your inquiry within 24 hours
- We'll prepare a detailed response with information and availability  
- You'll receive a personalized quote and recommendations

Best regards,
The Kenayo Jewels Team

This is an automated confirmation. Please do not reply to this email.
    `.trim();
  }
}

// Export singleton instance
export const emailService = new EmailService();
export type { InquiryData };
