import { RequestHandler } from "express";
import { emailService } from "../services/emailService";

export const handleEmailTest: RequestHandler = async (req, res) => {
  try {
    console.log('Testing email configuration...');
    
    // Test the email connection
    const connectionTest = await emailService.testConnection();
    
    if (!connectionTest) {
      return res.status(500).json({
        success: false,
        message: "Email configuration test failed. Please check your environment variables and Gmail app password.",
        details: {
          requiredEnvVars: ['GMAIL_USER', 'GMAIL_PASS', 'OWNER_EMAIL'],
          note: "Make sure GMAIL_PASS is an app password, not your regular Gmail password"
        }
      });
    }
    
    // Send a test email
    const testInquiry = {
      name: "Test Customer",
      company: "Test Company",
      email: process.env.OWNER_EMAIL || "test@example.com",
      phone: "+1-555-123-4567",
      quantity: "10",
      urgency: "normal",
      message: "This is a test inquiry to verify email functionality.",
      product: {
        id: "test-001",
        name: "Test Diamond Ring",
        category: "Diamond Ring",
        selectedVariants: {
          metal: "White Gold",
          size: "7"
        }
      },
      timestamp: new Date().toISOString(),
      type: "product" as const
    };
    
    const emailSent = await emailService.sendInquiryNotification(testInquiry);
    
    if (emailSent) {
      res.status(200).json({
        success: true,
        message: "Email test successful! Check your inbox for the test email.",
        details: {
          connectionTest: true,
          emailSent: true,
          testRecipient: process.env.OWNER_EMAIL
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Email connection successful but failed to send test email.",
        details: {
          connectionTest: true,
          emailSent: false
        }
      });
    }
    
  } catch (error) {
    console.error('Email test error:', error);
    res.status(500).json({
      success: false,
      message: "Email test failed",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
