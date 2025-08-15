import { RequestHandler } from "express";
import { z } from "zod";

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

export const handleInquiry: RequestHandler = async (req, res) => {
  try {
    // Validate the request body
    const inquiryData: InquiryData = InquirySchema.parse(req.body);
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Send confirmation email to customer
    
    // For now, we'll just log the inquiry and simulate email sending
    console.log('New inquiry received:', {
      type: inquiryData.type,
      customer: `${inquiryData.name} from ${inquiryData.company}`,
      email: inquiryData.email,
      product: inquiryData.product?.name || 'General inquiry',
      timestamp: inquiryData.timestamp
    });
    
    // Simulate email content
    const emailContent = generateEmailContent(inquiryData);
    console.log('Email content that would be sent:', emailContent);
    
    // In production, you would send this email using a service like:
    // - SendGrid
    // - AWS SES
    // - Nodemailer with SMTP
    // - Resend
    
    // Return success response
    res.status(200).json({
      success: true,
      message: "Inquiry received successfully. We will get back to you within 24 hours.",
      inquiryId: `INQ-${Date.now()}` // Generate a unique inquiry ID
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry data",
        errors: error.errors
      });
    }
    
    console.error('Error processing inquiry:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
};

function generateEmailContent(inquiry: InquiryData): string {
  const subject = inquiry.type === 'product' 
    ? `New Product Inquiry: ${inquiry.product?.name}`
    : 'New General Inquiry - Kenayo Jewels';
    
  const content = `
New ${inquiry.type} inquiry received from Kenayo Jewels website

Customer Information:
- Name: ${inquiry.name}
- Company: ${inquiry.company}
- Email: ${inquiry.email}
- Phone: ${inquiry.phone || 'Not provided'}
- Timestamp: ${new Date(inquiry.timestamp).toLocaleString()}

${inquiry.type === 'product' && inquiry.product ? `
Product Details:
- Product: ${inquiry.product.name}
- Category: ${inquiry.product.category}
- Product ID: ${inquiry.product.id}

Selected Variants:
${Object.entries(inquiry.product.selectedVariants)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join('\n') || 'None selected'}

Order Details:
- Quantity: ${inquiry.quantity || 'Not specified'}
- Urgency: ${inquiry.urgency || 'Not specified'}
` : ''}

Message:
${inquiry.message || 'No additional message provided'}

---
Please respond to this inquiry within 24 hours to maintain our service standards.
  `.trim();
  
  return content;
}
