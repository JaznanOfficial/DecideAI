"use client"

import { Cloud, Moon, Sun } from "lucide-react"
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
        "cursor-pointer rounded-full transition-all duration-500 border-2 relative overflow-hidden",
        "bg-background/50 backdrop-blur-sm",
        "hover:scale-110",
        resolvedTheme === "dark"
          ? "border-indigo-500/20 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-400"
          : "border-yellow-500/20 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-600"
      )}
      onClick={toggleTheme}
    >
      {/* Clouds (Day Mode) */}
      <Cloud 
        className={cn(
          "absolute -bottom-1 -left-1 w-6 h-6 text-white fill-white opacity-80 transition-all duration-500 blur-[1px]",
          resolvedTheme === "dark" ? "translate-y-4 opacity-0" : "translate-y-0"
        )} 
      />
      
      {/* Stars (Night Mode) */}
      <span className={cn(
        "absolute top-1.5 left-2.5 w-0.5 h-0.5 rounded-full bg-white transition-all duration-500",
        resolvedTheme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )} />
      <span className={cn(
        "absolute bottom-2 right-2 w-0.5 h-0.5 rounded-full bg-white transition-all duration-500 delay-75",
        resolvedTheme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )} />
      <span className={cn(
        "absolute top-2.5 right-2 sm:right-3 w-0.5 h-0.5 rounded-full bg-white transition-all duration-500 delay-150",
        resolvedTheme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )} />

      {/* Main Icons */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <Sun 
          className={cn(
            "h-5 w-5 transition-all duration-500 text-yellow-500 absolute",
            resolvedTheme === "dark" ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )} 
        />
        <Moon 
          className={cn(
            "h-5 w-5 transition-all duration-500 text-indigo-400 absolute",
            resolvedTheme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
          )} 
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
