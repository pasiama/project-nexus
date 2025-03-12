"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function RightSidebar() {
  return (
    <aside className="w-80 p-4 hidden lg:block sticky top-0 h-screen overflow-y-auto">
      <div className="space-y-6">
        <TrendingSection />
        <SuggestedUsers />
        <CategoriesSection />
      </div>
    </aside>
  )
}

function TrendingSection() {
  return (
    <section className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="font-bold mb-3">Trending Topics</h2>
      <div className="space-y-3">
        <TrendingTopic category="Latest" title="Latest AI Developments" />
        <TrendingTopic category="Research" title="UX/UI Trends 2023" />
      </div>
    </section>
  )
}

function TrendingTopic({ category, title }: { category: string; title: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{category}</p>
      <p className="font-medium text-sm">{title}</p>
    </div>
  )
}

function SuggestedUsers() {
  return (
    <section className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="font-bold mb-3">Suggested Users</h2>
      <div className="space-y-3">
        <SuggestedUser name="Sarah Wilson" username="@sarahwilson" role="Designer" />
        <SuggestedUser name="Mike Chen" username="@mikechen" role="Developer" />
      </div>
    </section>
  )
}

function SuggestedUser({
  name,
  username,
  role,
}: {
  name: string
  username: string
  role: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
      <Button variant="outline" size="sm" className="rounded-full text-xs px-3">
        Follow
      </Button>
    </div>
  )
}

function CategoriesSection() {
  return (
    <section className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="font-bold mb-3">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <CategoryTag label="News" />
        <CategoryTag label="Entertainment" />
        <CategoryTag label="Fashion" />
        <CategoryTag label="Tech" />
      </div>
    </section>
  )
}

function CategoryTag({ label }: { label: string }) {
  return <div className="bg-gray-100 px-3 py-1 rounded-full text-xs">{label}</div>
}

