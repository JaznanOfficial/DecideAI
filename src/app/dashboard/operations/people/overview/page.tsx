"use client"

import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarClock,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Users,
  UserPlus,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const metricHighlights = [
  {
    label: "Active headcount",
    value: "1,284",
    sublabel: "144 contingent",
    change: "+3.8% vs last month",
    trend: "up",
    icon: Users,
  },
  {
    label: "Net new hires (30d)",
    value: "42",
    sublabel: "27 technical, 15 GTM",
    change: "+11 planned",
    trend: "up",
    icon: UserPlus,
  },
  {
    label: "Voluntary attrition",
    value: "6.2%",
    sublabel: "Target: < 8%",
    change: "-1.1 pts",
    trend: "down",
    icon: HeartPulse,
  },
  {
    label: "Open roles",
    value: "58",
    sublabel: "19 critical paths",
    change: "Avg. age 23 days",
    trend: "flat",
    icon: BriefcaseBusiness,
  },
] as const

const pipelineStages = [
  {
    stage: "Sourcing",
    progress: 78,
    detail: "198 profiles in play · 54 shortlisted",
  },
  {
    stage: "Interviewing",
    progress: 64,
    detail: "32 final loops this week",
  },
  { stage: "Offer", progress: 48, detail: "12 approvals pending CFO sign-off" },
  { stage: "Onboarding", progress: 86, detail: "41 starts locked in next 21 days" },
] as const

const engagementSignals = [
  {
    title: "Engagement pulse",
    score: 92,
    change: "+4 pts",
    description: "Listening sprint closed 2 days ago",
  },
  {
    title: "Manager enablement",
    score: 76,
    change: "+2 pts",
    description: "Coaching coverage at 68% completion",
  },
  {
    title: "Learning velocity",
    score: 61,
    change: "-3 pts",
    description: "Micro-cert backlog flagged in design",
  },
] as const

const teamHealthSignals = [
  {
    team: "Velocity Core Squad",
    status: "Capacity risk",
    detail: "Utilization at 108%. Relief pod recommended.",
    owner: "S. Noor",
    severity: "high",
  },
  {
    team: "Launch Enablement Crew",
    status: "Change saturation",
    detail: "3 concurrent programs. Rotate facilitators.",
    owner: "R. Amin",
    severity: "medium",
  },
  {
    team: "Insights Collective",
    status: "Healthy",
    detail: "Backfill complete, onboarding tracking green.",
    owner: "T. Blake",
    severity: "low",
  },
] as const

const spotlightLeaders = [
  {
    name: "Ariana Patel",
    role: "People Partner · Product",
    focus: "Career architecture refresh",
    eta: "Sprint 34",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Carlos Mendes",
    role: "Talent Ops Lead",
    focus: "Slate quality automation",
    eta: "Beta in 2 weeks",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
] as const

export default function PeopleOverviewPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            <span>People operations overview</span>
            <Badge variant="secondary" className="gap-1 text-[0.65rem] font-medium">
              <Sparkles className="size-3.5" />
              Live insight
            </Badge>
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">People overview</h1>
            <span className="text-sm text-muted-foreground">Refreshed 12 minutes ago</span>
          </div>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Snapshot of workforce momentum, engagement health, and hiring throughput. Use it to
            calibrate leadership syncs and unblock teams quickly.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Export weekly digest
          </Button>
          <Button size="sm">Trigger Humio recap</Button>
        </div>
      </header>

      <div className="space-y-10 lg:grid lg:grid-cols-[minmax(0,2.15fr)_minmax(320px,1fr)] lg:items-start lg:gap-8">
        <div className="space-y-8">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metricHighlights.map((metric) => {
              const Icon = metric.icon
              const trendIcon =
                metric.trend === "up"
                  ? ArrowUpRight
                  : metric.trend === "down"
                    ? ArrowDownRight
                    : null

              return (
                <Card key={metric.label} className="border-border/60 shadow-sm">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-0">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <CardTitle className="mt-2 text-3xl font-semibold">{metric.value}</CardTitle>
                    </div>
                    <span className="rounded-full bg-muted/70 p-2 text-muted-foreground">
                      <Icon className="size-4" />
                    </span>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-4">
                    <p className="text-sm text-muted-foreground">{metric.sublabel}</p>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      {trendIcon ? (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                            metric.trend === "down"
                              ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                          )}
                        >
                          <trendIcon className="size-3" />
                          {metric.change}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">{metric.change}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </section>

          <section>
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle>Talent pipeline</CardTitle>
                  <CardDescription>Real-time hiring flow from sourcing to onboarding.</CardDescription>
                </div>
                <Badge variant="outline" className="gap-1">
                  <ShieldCheck className="size-3.5" />
                  Guardrails enabled
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {pipelineStages.map((stage) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{stage.stage}</span>
                      <span className="text-muted-foreground">{stage.progress}% capacity</span>
                    </div>
                    <Progress
                      value={stage.progress}
                      className={cn(
                        "h-2",
                        stage.progress > 80
                          ? "[&>div]:bg-emerald-500"
                          : stage.progress < 50
                            ? "[&>div]:bg-yellow-400"
                            : "[&>div]:bg-blue-500"
                      )}
                    />
                    <p className="text-sm text-muted-foreground">{stage.detail}</p>
                  </div>
                ))}
                <Separator />
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <p className="text-muted-foreground">
                    Offers awaiting approvals have been escalated to Finance Ops.
                  </p>
                  <Button variant="ghost" size="sm" className="gap-1 px-2 text-foreground">
                    View hiring board
                    <ArrowUpRight className="size-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle>Team health radar</CardTitle>
                <CardDescription>Where people partners are focusing this week.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamHealthSignals.map((signal) => (
                  <div
                    key={signal.team}
                    className="rounded-lg border border-border/60 bg-muted/30 p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">{signal.team}</p>
                        <p className="text-xs text-muted-foreground">{signal.detail}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "capitalize",
                          signal.severity === "high"
                            ? "text-red-600 dark:text-red-300"
                            : signal.severity === "medium"
                              ? "text-amber-600 dark:text-amber-300"
                              : "text-emerald-600 dark:text-emerald-300"
                        )}
                      >
                        {signal.status}
                      </Badge>
                    </div>
                    <Separator className="my-3" />
                    <p className="text-xs text-muted-foreground">
                      Owner: <span className="font-medium text-foreground">{signal.owner}</span>
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-8">
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Engagement signals</CardTitle>
              <CardDescription>Pulse programs orchestrated by Humio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {engagementSignals.map((signal) => (
                <div key={signal.title} className="rounded-xl border border-border/60 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{signal.title}</p>
                      <p className="text-xs text-muted-foreground">{signal.description}</p>
                    </div>
                    <span className="text-2xl font-semibold">{signal.score}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                    <ArrowUpRight className="size-3.5" />
                    {signal.change}
                  </div>
                </div>
              ))}
              <Button variant="secondary" size="sm" className="w-full">
                Schedule listening sprint
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Moments & rituals</CardTitle>
              <CardDescription>Upcoming checkpoints requiring people ops coverage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: "Quarterly talent calibration",
                  date: "Mar 04 · 9:00 CST",
                  owners: "Product & Ops",
                },
                {
                  label: "Leadership immersion week",
                  date: "Mar 11-15 · onsite",
                  owners: "ELT + People Partners",
                },
                {
                  label: "Returnship kickoff",
                  date: "Mar 18 · 14 participants",
                  owners: "Talent Dev",
                },
              ].map((moment) => (
                <div key={moment.label} className="rounded-lg border border-border/60 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarClock className="size-3.5" />
                    {moment.date}
                  </div>
                  <p className="mt-2 text-sm font-semibold">{moment.label}</p>
                  <p className="text-xs text-muted-foreground">Coverage: {moment.owners}</p>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full">
                View master calendar
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Spotlight partners</CardTitle>
              <CardDescription>Leads driving priority programs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {spotlightLeaders.map((leader) => (
                <div key={leader.name} className="flex items-start gap-3 rounded-lg border border-border/60 p-3">
                  <Avatar>
                    <AvatarImage src={leader.avatar} alt={leader.name} />
                    <AvatarFallback>
                      {leader.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{leader.name}</p>
                    <p className="text-xs text-muted-foreground">{leader.role}</p>
                    <p className="text-sm">{leader.focus}</p>
                    <p className="text-xs text-muted-foreground">Next update: {leader.eta}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                Share kudos with leaders
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
