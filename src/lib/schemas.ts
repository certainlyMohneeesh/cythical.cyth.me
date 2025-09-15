import dynamicIconImports from "lucide-react/dynamicIconImports";
import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .min(2, { message: "Must be at least 2 characters." })
    .max(100, { message: "Name must be less than 100 characters." })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, hyphens, and apostrophes." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Please enter a valid email address.")
    .max(255, { message: "Email must be less than 255 characters." }),
  message: z
    .string()
    .min(1, { message: "Message is required." })
    .min(10, { message: "Message must be at least 10 characters." })
    .max(2000, { message: "Message must be less than 2000 characters." }),
});

const iconLink = z.object({
  name: z.string(),
  href: z.string().url(),
  icon: z.custom<keyof typeof dynamicIconImports>(),
});
export type IconLink = z.infer<typeof iconLink>;

const project = z.object({
  name: z.string(),
  description: z.string(),
  href: z.string().url().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()),
  links: z.array(iconLink),
});
export const projectSchema = z.object({ projects: z.array(project) });
export type Project = z.infer<typeof project>;

const experience = z.object({
  name: z.string(),
  href: z.string(),
  title: z.string(),
  logo: z.string(),
  start: z.string(),
  end: z.string().optional(),
  description: z.array(z.string()).optional(),
  links: z.array(iconLink).optional(),
});
export type Experience = z.infer<typeof experience>;

export const careerSchema = z.object({ career: z.array(experience) });
export const educationSchema = z.object({ education: z.array(experience) });
export const socialSchema = z.object({ socials: z.array(iconLink) });
