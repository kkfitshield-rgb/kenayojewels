import { RequestHandler } from "express";
import { emailService } from "../services/emailService";
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
    
    // Log the inquiry for debugging
    console.log('New inquiry received:', {
      type: inquiryData.type,
      customer: `${inquiryData.name} from ${inquiryData.company}`,
      email: inquiryData.email,
      product: inquiryData.product?.name || 'General inquiry',
      timestamp: inquiryData.timestamp
    });
    
    // Generate unique inquiry ID
    const inquiryId = `INQ-${Date.now()}`;
    
    // Attempt to send notification email to owner
    let emailSent = false;
    let customerEmailSent = false;
    
    try {
      emailSent = await emailService.sendInquiryNotification(inquiryData);
      if (emailSent) {
        console.log(`Owner notification email sent for inquiry ${inquiryId}`);
      }
    } catch (emailError) {
      console.error(`Failed to send owner notification for inquiry ${inquiryId}:`, emailError);
    }
    
    // Attempt to send confirmation email to customer
    try {
      customerEmailSent = await emailService.sendCustomerConfirmation(inquiryData);
      if (customerEmailSent) {
        console.log(`Customer confirmation email sent for inquiry ${inquiryId}`);
      }
    } catch (emailError) {
      console.error(`Failed to send customer confirmation for inquiry ${inquiryId}:`, emailError);
    }
    
    // In a real application, you would also:
    // 1. Save to database
    // 2. Add to CRM system
    // 3. Create follow-up tasks
    
    // Return success response
    const response = {
      success: true,
      message: "Inquiry received successfully. We will get back to you within 24 hours.",
      inquiryId: inquiryId,
      emailStatus: {
        ownerNotified: emailSent,
        customerConfirmed: customerEmailSent
      }
    };
    
    res.status(200).json(response);
    
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
