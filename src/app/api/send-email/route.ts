import { NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/schemas";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = ContactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid form data", details: result.error.errors }, { status: 400 });
    }

    const { name, email, message } = result.data;

    await resend.emails.send({
      from: "Portfolio Contact <no-reply@cyth.me>",
      to: "certainlymohneesh@gmail.com", // Replace with your receiving email
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}