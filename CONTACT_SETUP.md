# Contact Form Setup Guide

## 🚀 Quick Setup

Your contact form is now fully functional! Follow these steps to complete the setup:

### 1. Get Resend API Key
1. Visit [Resend.com](https://resend.com)
2. Sign up/login to your account
3. Go to "API Keys" section
4. Create a new API key
5. Copy the API key (starts with `re_`)

### 2. Set Up Environment Variables
Create a `.env.local` file in your project root with:

```env
# Resend API Key (required)
RESEND_API_KEY=re_your_actual_api_key_here

# Your domain for sending emails (optional)
RESEND_FROM_DOMAIN=cyth.me

# Your receiving email (optional - defaults to certainlymohneesh@gmail.com)
CONTACT_EMAIL=certainlymohneesh@gmail.com
```

### 3. Configure Your Domain (Optional but Recommended)
1. In Resend dashboard, go to "Domains"
2. Add your domain (cyth.me)
3. Follow DNS setup instructions
4. Verify the domain

### 4. Test the Contact Form
1. Start your development server: `npm run dev`
2. Navigate to `/contact` page
3. Fill out and submit the form
4. Check your email for both:
   - The message sent to you
   - The confirmation email sent to the form submitter

## ✨ Features Implemented

### For You (Site Owner):
- ✅ Professional email notifications with contact details
- ✅ Reply-to automatically set to sender's email
- ✅ Clean, formatted message display
- ✅ Contact information clearly organized
- ✅ Branded email templates

### For Visitors:
- ✅ Immediate confirmation email after submission
- ✅ Professional auto-response with your branding
- ✅ Form validation and error handling
- ✅ Character counter for message field
- ✅ Loading states and success feedback
- ✅ Enhanced UX with proper labels and hints

### Security & Validation:
- ✅ Server-side validation with Zod schemas
- ✅ Input sanitization and length limits
- ✅ Proper error handling and logging
- ✅ Rate limiting protection (via Resend)
- ✅ Privacy policy integration

## 🎨 Contact Page Features

### Enhanced UI:
- Professional contact information display
- Quick contact details with badges
- Skills and opportunities section
- Responsive design for all devices
- Improved form layout with better spacing

### Form Enhancements:
- Real-time character counting
- Input validation with helpful error messages
- Auto-capitalization for names
- Professional placeholders and labels
- Submit button with loading states

## 📧 Email Templates

### Owner Notification Email:
- Clean, professional design
- Contact details in organized table
- Message displayed in formatted box
- Quick action suggestions
- Branded footer with portfolio link

### Visitor Confirmation Email:
- Personalized greeting
- Confirmation of message receipt
- Copy of their submitted message
- Links to explore your work
- Professional signature

## 🔧 Technical Implementation

### API Endpoint (`/api/send-email`):
- Comprehensive error handling
- Input validation and sanitization
- Dual email sending (notification + confirmation)
- Detailed logging for debugging
- Environment variable validation

### Form Component:
- React Hook Form with Zod validation
- Real-time form state management
- Accessibility features (labels, ARIA)
- Toast notifications for user feedback
- Character counting and input hints

### Contact Page:
- Modern card-based layout
- Contact information display
- Skills and availability badges
- Responsive grid system
- SEO-friendly structure

## 🚀 Ready to Deploy

Your contact form is production-ready! Make sure to:

1. Set up your Resend API key in Vercel environment variables
2. Configure your domain in Resend (recommended)
3. Test the form thoroughly before going live
4. Monitor email delivery in Resend dashboard

The form will automatically send emails to `certainlymohneesh@gmail.com` and provide professional responses to all inquiries.