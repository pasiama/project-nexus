"use client";


import type { ReactNode } from "react"
import Sidebar from "@/components/navigation/sidebar"
import RightSidebar from "@/components/navigation/right-sidebar"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 border-x border-gray-200 max-w-2xl mx-auto">{children}</main>
      <RightSidebar />
    </div>
  )
}

