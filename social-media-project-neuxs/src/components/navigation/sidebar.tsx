import type React from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Search, MessageSquare, Bell, User } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="w-64 p-4 hidden md:block sticky top-0 h-screen">
      <div className="flex items-center gap-2 mb-8">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">John Doe</p>
          <p className="text-xs text-muted-foreground">@johndoe</p>
        </div>
      </div>

      <nav className="space-y-1">
        <NavItem href="/" icon={<Home className="h-5 w-5" />} label="Home" active />
        <NavItem href="/explore" icon={<Search className="h-5 w-5" />} label="Explore" />
        <NavItem href="/messages" icon={<MessageSquare className="h-5 w-5" />} label="Messages" />
        <NavItem href="/notifications" icon={<Bell className="h-5 w-5" />} label="Notifications" />
        <NavItem href="/profile" icon={<User className="h-5 w-5" />} label="Profile" />
      </nav>
    </aside>
  )
}

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
        active ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

