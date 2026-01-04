"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "cursor-pointer rounded-full transition-all duration-500 border-2",
        "bg-background/50 backdrop-blur-sm",
        "hover:scale-110",
        resolvedTheme === "dark"
          ? "border-indigo-500/20 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-400"
          : "border-yellow-500/20 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-600"
      )}
      onClick={toggleTheme}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 text-yellow-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 text-indigo-400 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
