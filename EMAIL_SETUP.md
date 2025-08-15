# Email Notification Setup Guide

This guide explains how to set up automatic email notifications for jewelry inquiry forms using Nodemailer with Gmail SMTP.

## 🚀 Features

- **Automatic Email Notifications**: Owner receives emails when customers submit inquiries
- **Customer Confirmations**: Customers get automatic confirmation emails
- **Rich HTML Emails**: Professional formatted emails with product details
- **Secure Configuration**: Uses environment variables for sensitive data
- **Gmail SMTP Integration**: Free email service using Gmail
- **Product-Specific Inquiries**: Detailed product information in emails

## 📧 Email Configuration

### Step 1: Set up Gmail App Password

1. **Enable 2-Factor Authentication** on your Gmail account (required for app passwords)
2. **Generate App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Select "Security" → "2-Step Verification" → "App passwords"
   - Generate a new app password for "Mail"
   - Copy the 16-character password (format: xxxx-xxxx-xxxx-xxxx)

### Step 2: Configure Environment Variables

Set these environment variables in your system or development environment:

```bash
GMAIL_USER=your.email@gmail.com
GMAIL_PASS=your-16-character-app-password
OWNER_EMAIL=owner@kenayojewels.com
```

**Using DevServerControl (in this environment):**
```bash
# Set Gmail account
GMAIL_USER="your.business@gmail.com"

# Set app password (remove spaces/dashes)
GMAIL_PASS="abcdabcdabcdabcd"

# Set owner email (where notifications are sent)
OWNER_EMAIL="owner@kenayojewels.com"
```

### Step 3: Test Email Configuration

Visit the test endpoint to verify setup:
```
GET http://localhost:8080/api/email-test
```

## 📝 How It Works

### 1. Customer Submits Inquiry
When a customer clicks "Inquiry" on any jewelry design, they fill out a form with:
- Personal information (name, company, email, phone)
- Order details (quantity, urgency)
- Custom message
- Product details (automatically captured)
- Selected variants (metal, size, etc.)

### 2. Automatic Email Processing
The system automatically:
- ✅ Validates the inquiry data
- ✅ Sends notification email to owner
- ✅ Sends confirmation email to customer
- ✅ Logs the inquiry with unique ID
- ✅ Returns success/error response

### 3. Owner Notification Email
The owner receives a professionally formatted email containing:
- **Customer Information**: Name, company, email, phone
- **Product Details**: Name, category, ID, selected variants
- **Order Information**: Quantity, urgency level
- **Customer Message**: Any additional notes
- **Reply-To Setup**: Owner can reply directly to customer

### 4. Customer Confirmation Email
The customer receives a confirmation email with:
- Thank you message
- Inquiry details
- Next steps information
- Expected response timeline

## 🔧 API Endpoints

### POST /api/inquiry
Handles inquiry form submissions with automatic email notifications.

**Request Body:**
```json
{
  "name": "John Doe",
  "company": "ABC Jewelry Store",
  "email": "john@abcjewelry.com",
  "phone": "+1-555-123-4567",
  "quantity": "25",
  "urgency": "normal",
  "message": "Interested in bulk pricing...",
  "product": {
    "id": "1",
    "name": "Classic Solitaire Diamond Ring",
    "category": "Diamond Ring",
    "selectedVariants": {
      "metal": "White Gold",
      "size": "7"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "type": "product"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry received successfully. We will get back to you within 24 hours.",
  "inquiryId": "INQ-1642234800000",
  "emailStatus": {
    "ownerNotified": true,
    "customerConfirmed": true
  }
}
```

### GET /api/email-test
Tests email configuration and sends a test email.

## 🛡️ Security Features

- **Environment Variables**: Sensitive data stored securely
- **Input Validation**: All inquiry data validated with Zod
- **Error Handling**: Graceful fallbacks if email fails
- **SMTP Security**: TLS encryption for email transmission
- **No Exposed Credentials**: App passwords prevent account access

## 🎨 Email Templates

### Owner Notification Email Features:
- **Professional Header**: Kenayo Jewels branding
- **Customer Section**: Complete contact information
- **Product Section**: Detailed product info with variants
- **Order Details**: Quantity and urgency highlighting
- **Message Section**: Customer's custom message
- **Action Footer**: Response time reminder

### Customer Confirmation Email Features:
- **Branded Header**: Professional welcome message
- **Confirmation Details**: What they inquired about
- **Next Steps**: Clear expectations
- **Response Timeline**: 24-hour commitment

## 🔍 Troubleshooting

### Common Issues:

1. **"Email configuration test failed"**
   - Check Gmail 2FA is enabled
   - Verify app password is correct (16 characters, no spaces)
   - Ensure GMAIL_USER is the full email address

2. **"Failed to send email"**
   - Check internet connection
   - Verify Gmail account isn't blocked
   - Try regenerating app password

3. **"Invalid inquiry data"**
   - Check all required fields are provided
   - Verify email format is valid
   - Ensure product data structure is correct

### Debug Steps:
1. Test email configuration: `GET /api/email-test`
2. Check server logs for detailed error messages
3. Verify environment variables are set correctly
4. Test with a simple inquiry first

## 📁 File Structure

```
server/
├── services/
│   └── emailService.ts      # Main email service with Nodemailer
├── routes/
│   ├── inquiry.ts           # Updated inquiry handler
│   └── emailTest.ts         # Email testing endpoint
└── index.ts                 # Server with email routes

client/
├── components/
│   └── InquiryModal.tsx     # Updated inquiry form
└── pages/
    ├── Index.tsx            # Featured products with inquiry
    └── Catalog.tsx          # Catalog with inquiry
```

## 🎯 Production Deployment

### Environment Variables for Production:
```bash
# Production Gmail account
GMAIL_USER=notifications@kenayojewels.com
GMAIL_PASS=your-production-app-password
OWNER_EMAIL=owner@kenayojewels.com

# Optional: Set custom email settings
EMAIL_FROM_NAME="Kenayo Jewels Notifications"
EMAIL_REPLY_TO=support@kenayojewels.com
```

### Production Considerations:
- Use a dedicated business Gmail account
- Set up email monitoring/logging
- Consider email rate limiting for high volume
- Add email templates customization
- Implement email queue for reliability

## ✅ Testing Checklist

- [ ] Environment variables configured
- [ ] Gmail 2FA enabled and app password generated
- [ ] Email test endpoint returns success
- [ ] Product inquiry form submits successfully
- [ ] Owner notification email received
- [ ] Customer confirmation email received
- [ ] Email formatting looks professional
- [ ] Reply-to functionality works
- [ ] Error handling works when email fails

## 📞 Support

If you need assistance with email setup:
1. Check the troubleshooting section above
2. Verify your Gmail configuration
3. Test with the provided endpoints
4. Review server logs for detailed errors

The email notification system is now fully functional and will automatically send professional emails for every jewelry inquiry!
