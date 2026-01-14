import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function OrganizationPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Organization Profile</h1>
        <p className="text-muted-foreground">
          Capture key information about your company to fuel reporting,
          compliance, and AI copilots.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General details</CardTitle>
            <CardDescription>
              Core identifiers for your organization and brand presence.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="org-name" label="Organization name" placeholder="Acme Corporation" />
              <Field id="org-legal-name" label="Legal entity name" placeholder="Acme Corporation Ltd." />
              <Field id="org-domain" label="Primary domain" placeholder="acme.com" type="url" />
              <Field id="org-industry" label="Industry" placeholder="Consumer technology" />
              <Field id="org-size" label="Company size" placeholder="250-500 employees" />
              <Field id="org-hq" label="Headquarters" placeholder="Austin, Texas, USA" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="org-founded" label="Founded" placeholder="2014" />
              <Field id="org-registration" label="Registration / EIN" placeholder="12-3456789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-mission">Mission / positioning</Label>
              <Textarea
                id="org-mission"
                placeholder="Describe your mission, positioning statement, or elevator pitch..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact & compliance</CardTitle>
            <CardDescription>
              Primary points of contact and regulatory information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="contact-name" label="Primary contact" placeholder="Evelyn Moore" />
              <Field id="contact-role" label="Role / title" placeholder="Chief of Staff" />
              <Field id="contact-email" label="Contact email" placeholder="ops@acme.com" type="email" />
              <Field id="contact-phone" label="Phone number" placeholder="+1 (555) 123-9876" type="tel" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="security-framework" label="Security framework" placeholder="SOC 2 Type II" />
              <Field id="privacy-contact" label="Privacy contact email" placeholder="privacy@acme.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-address">Registered address</Label>
              <Textarea
                id="org-address"
                placeholder="123 Innovation Way&#10;Suite 500&#10;Austin, TX 73301"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operational context</CardTitle>
          <CardDescription>
            Capture current initiatives and strategic priorities for assistant context.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field id="org-segments" label="Business segments" placeholder="Enterprise SaaS, Consumer mobile" />
            <Field id="org-regions" label="Regions supported" placeholder="North America, EU, APAC" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-initiatives">Active initiatives</Label>
            <Textarea
              id="org-initiatives"
              placeholder="List key programs, launches, or critical initiatives the assistants should know about..."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-notes">Notes for Humio AI</Label>
            <Textarea
              id="org-notes"
              placeholder="House rules, tone preferences, escalation paths, etc."
              rows={4}
            />
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button variant="outline">Discard</Button>
            <Button>Save organization profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

type FieldProps = {
  id: string
  label: string
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
}

function Field({ id, label, placeholder, type = "text" }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  )
}
