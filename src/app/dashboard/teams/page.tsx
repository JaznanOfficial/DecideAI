import { redirect } from "next/navigation"

export default function LegacyTeamsPage() {
  redirect("/dashboard/operations/people/teams")
}
