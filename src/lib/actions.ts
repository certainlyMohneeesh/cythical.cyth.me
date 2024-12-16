"use server";

import ContactFormEmail from "@/components/email/ContactFormEmail";
import { Resend } from "resend";
import { z } from "zod";
import { ContactFormSchema } from "./schemas";
import { redirect } from "next/navigation";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.format() };
  }

  try {
    const { name, email, message } = result.data;
    const { data: emailData, error } = await resend.emails.send({
      from: `cythical.cyth.me <contact@cyth.me>`,
      to: "certainlymohneesh@gmail.com",
      replyTo: [email],
      cc: [email],
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
      react: ContactFormEmail({ name, email, message }),
    });

    if (!emailData || error) {
      console.error(error?.message);
      throw new Error("Failed to send email!");
    }

    redirect("/?message=success");
  } catch (error) {
    return { error };
  }
}
