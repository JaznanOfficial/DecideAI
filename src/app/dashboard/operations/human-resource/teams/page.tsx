"use client"

import { useMemo, useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, Plus } from "lucide-react"

const talentDirectory = [
  { name: "Noah Rahman", role: "Squad Lead", avatar: "https://i.pravatar.cc/150?img=3" },
  { name: "Lina Chowdhury", role: "Delivery Manager", avatar: "https://i.pravatar.cc/150?img=22" },
  { name: "Hector Diaz", role: "Product Strategist", avatar: "https://i.pravatar.cc/150?img=44" },
  { name: "Anika Bose", role: "QA Architect", avatar: "https://i.pravatar.cc/150?img=13" },
  { name: "Musa Ahmed", role: "AI Engineer", avatar: "https://i.pravatar.cc/150?img=18" },
  { name: "Priya Nair", role: "Experience Designer", avatar: "https://i.pravatar.cc/150?img=26" },
  { name: "Jonah Lee", role: "Data Scientist", avatar: "https://i.pravatar.cc/150?img=30" },
  { name: "Selim Faruq", role: "Program Ops", avatar: "https://i.pravatar.cc/150?img=53" },
  { name: "Ruqayyah Amin", role: "People Partner", avatar: "https://i.pravatar.cc/150?img=61" },
]

const initialTeams = [
  {
    name: "Velocity Core Squad",
    members: talentDirectory.slice(0, 4),
  },
  {
    name: "People Analytics Guild",
    members: talentDirectory.slice(4, 7),
  },
  {
    name: "Launch Enablement Crew",
    members: talentDirectory.slice(6, 9),
  },
]

const memberId = (name: string) =>
  `team-member-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

export default function HumanResourceTeamsPage() {
  const [teams, setTeams] = useState(initialTeams)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [teamName, setTeamName] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)

  const isSubmitDisabled = !teamName.trim() || selectedMembers.length === 0

  const hydratedMembers = useMemo(
    () =>
      selectedMembers
        .map((name) => talentDirectory.find((person) => person.name === name))
        .filter(Boolean) as typeof talentDirectory,
    [selectedMembers]
  )

  function toggleMember(name: string) {
    setSelectedMembers((prev) =>
      prev.includes(name)
        ? prev.filter((entry) => entry !== name)
        : [...prev, name]
    )
  }

  function resetFormState() {
    setTeamName("")
    setSelectedMembers([])
    setEditingIndex(null)
    setDialogMode("create")
  }

  function handleDialogOpenChange(open: boolean) {
    setDialogOpen(open)
    if (!open) {
      resetFormState()
    }
  }

  function handleStartCreate() {
    resetFormState()
    setDialogMode("create")
    setDialogOpen(true)
  }

  function handleStartEdit(index: number) {
    const team = teams[index]
    setDialogMode("edit")
    setEditingIndex(index)
    setTeamName(team.name)
    setSelectedMembers(team.members.map((member) => member.name))
    setDialogOpen(true)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitDisabled) return

    if (dialogMode === "create") {
      setTeams((prev) => [
        { name: teamName.trim(), members: hydratedMembers },
        ...prev,
      ])
    } else if (dialogMode === "edit" && editingIndex !== null) {
      setTeams((prev) =>
        prev.map((team, index) =>
          index === editingIndex
            ? { ...team, name: teamName.trim(), members: hydratedMembers }
            : team
        )
      )
    }

    setDialogOpen(false)
  }

  function handleDeleteTeam() {
    if (deleteTarget === null) return
    setTeams((prev) => prev.filter((_, index) => index !== deleteTarget))
    setDeleteTarget(null)
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">
            Curate high-performing squads and keep rosters aligned with the plan.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
          <Button className="gap-2" onClick={handleStartCreate}>
            <Plus className="size-4" />
            Create Team
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {dialogMode === "edit" ? "Edit team" : "New team"}
              </DialogTitle>
              <DialogDescription>
                {dialogMode === "edit"
                  ? "Refresh team details and update the roster."
                  : "Give the team a purpose and assign its members."}
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="team-name">
                  Team name
                </label>
                <Input
                  id="team-name"
                  placeholder="e.g. AI Insights Pod"
                  value={teamName}
                  onChange={(event) => setTeamName(event.target.value)}
                />
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium">Assign members</p>
                <ScrollArea className="h-48 rounded-md border">
                  <div className="flex flex-col divide-y">
                    {talentDirectory.map((person) => {
                      const checkboxId = memberId(person.name)
                      return (
                        <label
                          key={person.name}
                          htmlFor={checkboxId}
                          className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-muted/50"
                        >
                          <Checkbox
                            id={checkboxId}
                            checked={selectedMembers.includes(person.name)}
                            onCheckedChange={() => toggleMember(person.name)}
                          />
                          <div className="flex items-center gap-3">
                            <Avatar className="size-8">
                              <AvatarImage src={person.avatar} alt={person.name} />
                              <AvatarFallback>
                                {person.name
                                  .split(" ")
                                  .map((part) => part[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{person.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {person.role}
                              </p>
                            </div>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>
              <DialogFooter className="gap-2 sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitDisabled}>
                  {dialogMode === "edit" ? "Save changes" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="grid gap-4">
          {teams.map((team, index) => (
            <Card
              key={team.name}
              className={cn(
                "border-muted-foreground/10 shadow-none transition hover:border-primary/40"
              )}
            >
              <CardHeader className="space-y-3">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {team.name}
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {team.members.map((member) => (
                        <Avatar
                          key={member.name}
                          className="size-9 border-2 border-background"
                        >
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Open actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={(event) => {
                            event.preventDefault()
                            handleStartEdit(index)
                          }}
                        >
                          Edit team
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onSelect={(event) => {
                            event.preventDefault()
                            setDeleteTarget(index)
                          }}
                        >
                          Delete team
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
      <div className="mt-auto flex justify-end">
        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete team</AlertDialogTitle>
            <AlertDialogDescription>
              Removing a team also clears its roster assignments. This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTeam}
              className={cn(
                buttonVariants({ variant: "destructive" }),
                "hover:bg-destructive/90"
              )}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
