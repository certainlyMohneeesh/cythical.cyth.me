import { NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/schemas";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" }, 
        { status: 500 }
      );
    }

    const body = await req.json();
    const result = ContactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { 
          error: "Invalid form data", 
          details: result.error.errors 
        }, 
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Create professional email HTML template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">💌 New Contact Form Submission</h2>
          
          <div style="background-color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #475569; margin-bottom: 15px;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b; width: 80px;">Name:</td>
                <td style="padding: 8px 0; color: #1e293b;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email:</td>
                <td style="padding: 8px 0; color: #1e293b;">
                  <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                </td>
              </tr>
            </table>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 6px;">
            <h3 style="color: #475569; margin-bottom: 15px;">Message</h3>
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 4px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #e0f2fe; border-radius: 6px;">
            <p style="margin: 0; font-size: 14px; color: #0369a1;">
              💡 <strong>Quick Actions:</strong>
            </p>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #0369a1;">
              • Reply directly to this email to respond to ${name}<br/>
              • The reply-to address is automatically set to: ${email}
            </p>
          </div>

          <div style="margin-top: 20px; text-align: center;">
            <p style="font-size: 12px; color: #64748b;">
              This email was sent from your portfolio contact form at 
              <a href="https://cythical.cyth.me" style="color: #3b82f6;">cythical.cyth.me</a>
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email to you (the site owner)
    const emailResult = await resend.emails.send({
      from: `Portfolio Contact <noreply@${process.env.RESEND_FROM_DOMAIN || 'cyth.me'}>`,
      to: process.env.CONTACT_EMAIL || "certainlymohneesh@gmail.com",
      subject: `💌 New Contact: ${name} - Portfolio Message`,
      replyTo: email,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResult);

    // Send confirmation email to the sender
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Hi ${name}! 👋</h2>
          
          <div style="background-color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <p style="color: #475569; line-height: 1.6; margin-bottom: 15px;">
              Thank you for reaching out through my portfolio! I've received your message and will get back to you as soon as possible.
            </p>
            
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 4px; margin: 15px 0;">
              <p style="margin: 0; font-weight: bold; color: #64748b; font-size: 14px;">Your message:</p>
              <p style="margin: 8px 0 0 0; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #475569; line-height: 1.6;">
              In the meantime, feel free to:
            </p>
            <ul style="color: #475569; line-height: 1.6;">
              <li>Check out my latest projects on <a href="https://cythical.cyth.me/projects" style="color: #3b82f6;">my portfolio</a></li>
              <li>Connect with me on social media</li>
              <li>Explore my blog for tech insights</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <p style="font-size: 12px; color: #64748b;">
              Best regards,<br/>
              <strong>Mohneesh</strong><br/>
              <a href="https://cythical.cyth.me" style="color: #3b82f6;">cythical.cyth.me</a>
            </p>
          </div>
        </div>
      </div>
    `;

    const confirmationResult = await resend.emails.send({
      from: `Mohneesh <noreply@${process.env.RESEND_FROM_DOMAIN || 'cyth.me'}>`,
      to: email,
      subject: "Thanks for reaching out! 🚀",
      html: confirmationHtml,
    });

    console.log("Confirmation email sent:", confirmationResult);

    return NextResponse.json({ 
      success: true, 
      message: "Message sent successfully! You'll receive a confirmation email shortly." 
    });

  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { 
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}