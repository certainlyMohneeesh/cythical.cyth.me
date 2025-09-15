"use client";

import { ContactFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import Link from "next/link";
import { useState, useEffect } from "react";

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const [messageLength, setMessageLength] = useState(0);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Watch the message field for character count
  const messageValue = watch("message");
  
  useEffect(() => {
    setMessageLength(messageValue?.length || 0);
  }, [messageValue]);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        console.error("Email sending failed:", result);
        toast.error(
          result.error || "An error occurred! Please try again later."
        );
        return;
      }

      toast.success(
        result.message || "Message sent successfully! You'll receive a confirmation email."
      );
      reset();
      setMessageLength(0);
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error! Please check your connection and try again.");
    }
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit(processForm)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              autoComplete="given-name"
              {...register("name", {
                onChange: (e) => {
                  // Auto-capitalize first letter of each word
                  const value = e.target.value;
                  const capitalizedValue = value
                    .split(' ')
                    .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ');
                  e.target.value = capitalizedValue;
                }
              })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name?.message && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              autoComplete="email"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email?.message && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="message" className="text-sm font-medium">
              Message <span className="text-red-500">*</span>
            </label>
            <span className={`text-xs ${messageLength > 1800 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {messageLength}/2000
            </span>
          </div>
          <Textarea
            id="message"
            rows={6}
            placeholder="Tell me about your project, ask a question, or just say hello! I'd love to hear from you."
            className={`resize-none ${errors.message ? "border-red-500" : ""}`}
            {...register("message", {
              onChange: (e) => setMessageLength(e.target.value.length)
            })}
          />
          {errors.message?.message && (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          )}
          <p className="text-xs text-muted-foreground">
            💡 Feel free to mention: project details, timeline, budget, or any questions you have.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full disabled:opacity-50"
            size="lg"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <ReloadIcon className="mr-2 animate-spin" />
                <span>Sending your message...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <PaperPlaneIcon className="mr-2" />
                <span>Send Message</span>
              </div>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to my{" "}
            <Link href="/privacy" className="link font-semibold hover:underline">
              privacy policy
            </Link>
            . I'll respond within 24 hours and send you a confirmation email.
          </p>
        </div>
      </form>
    </div>
  );
}
