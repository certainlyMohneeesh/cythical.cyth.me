import ContactForm from "@/components/ContactForm";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";

export default function ContactPage() {
  return (
    <article className="mt-8 md:mt-32 flex flex-col gap-8 pb-16">
      <div>
        <h1 className="title mb-4">Let's connect! 💬</h1>
        <p className="text-muted-foreground text-lg">
          I'm always interested in hearing about new opportunities, collaborating on exciting projects, 
          or just having a chat about technology and innovation.
        </p>
      </div>

      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quick Contact</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="shrink-0">📧</Badge>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href="mailto:certainlymohneesh@gmail.com" 
                    className="link font-medium"
                  >
                    certainlymohneesh@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="shrink-0">⚡</Badge>
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="font-medium">Usually within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="shrink-0">🌍</Badge>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Open to global opportunities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What I'm Looking For</h2>
            <div className="space-y-2">
              <Badge variant="secondary">Full-stack Development</Badge>
              <Badge variant="secondary">System Architecture</Badge>
              <Badge variant="secondary">AI/ML Projects</Badge>
              <Badge variant="secondary">Open Source Collaboration</Badge>
              <Badge variant="secondary">Technical Consulting</Badge>
            </div>
          </div>
        </div>
      </Card>

      <Separator />
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Send me a message 📝</h2>
        <p className="text-muted-foreground mb-6">
          Use the form below to get in touch. I'll respond to your message and send you a confirmation email.
        </p>
        <ContactForm />
      </div>
    </article>
  );
}
