"use client"

import { useState, type FormEvent, type ReactNode } from "react"

import { ClipboardCheck } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const teamOptions = [
  { id: "velocity-core", label: "Velocity Core Squad" },
  { id: "launch-enablement", label: "Launch Enablement Crew" },
  { id: "insights-collective", label: "Insights Collective" },
] as const

export default function PeopleOnboardingPage() {
  function handleIntakeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  const [selectedTeams, setSelectedTeams] = useState<string[]>([])

  const toggleTeam = (teamId: string) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId]
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)]">
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle>New hire intake</CardTitle>
            <CardDescription>Capture the essentials so Humio can orchestrate the journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleIntakeSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full name">
                  <Input required placeholder="e.g. Lina Chowdhury" />
                </Field>
                <Field label="Work email">
                  <Input type="email" required placeholder="lina@acme.com" />
                </Field>
                <Field label="Temporary password">
                  <Input type="password" required placeholder="Set initial password" />
                </Field>
                <Field label="Team assignment">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {teamOptions.map((team) => {
                        const active = selectedTeams.includes(team.id)
                        return (
                          <button
                            key={team.id}
                            type="button"
                            onClick={() => toggleTeam(team.id)}
                            className={cn(
                              "rounded-full border px-3 py-1 text-sm transition-all",
                              active
                                ? "border-primary/80 bg-primary/10 text-primary"
                                : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-primary"
                            )}
                            aria-pressed={active}
                          >
                            {team.label}
                          </button>
                        )
                      })}
                    </div>
                    <Label className="text-xs font-normal text-muted-foreground">
                      {selectedTeams.length
                        ? `Assigned to: ${selectedTeams
                            .map((id) => teamOptions.find((team) => team.id === id)?.label)
                            .filter(Boolean)
                            .join(", ")}`
                        : "Select one or more teams"}
                    </Label>
                  </div>
                </Field>
                <Field label="Start date">
                  <Input type="date" required />
                </Field>
                <Field label="Home hub / location">
                  <Input placeholder="Austin, TX · Hybrid" />
                </Field>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Hiring manager">
                  <Input placeholder="Musa Ahmed" />
                </Field>
                <Field label="Employment type">
                  <Select defaultValue="full-time">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="intern">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Role / squad placement">
                <Input placeholder="Velocity Core Squad · Product Strategist" />
              </Field>
              <Field label="Equipment / notes">
                <Textarea
                  placeholder="MacBook Pro, 2 monitors, accessibility keyboard. Add travel stipend + design kit."
                  rows={4}
                />
              </Field>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" className="gap-2">
                  <ClipboardCheck className="size-4" />
                  Create onboarding plan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

type FieldProps = {
  label: string
  children: ReactNode
}

function Field({ label, children }: FieldProps) {
  return (
    <div className="space-y-2 text-sm font-medium text-foreground/90">
      <span>{label}</span>
      <div className="space-y-2 text-sm font-normal text-foreground">{children}</div>
    </div>
  )
}
