import { useQuery } from "@apollo/client"
import { GET_POSTS } from "@/lib/graphql/queries"
import PostCreator from "./post-creator"
import PostItem from "./post-item"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function Feed() {
  const { data, loading, error } = useQuery(GET_POSTS)

  return (
    <div className="divide-y divide-gray-200">
      <PostCreator />

      {loading && <FeedSkeleton />}

      {error && (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load posts. Please try again later.</AlertDescription>
        </Alert>
      )}

      {data?.posts.map((post: any) => (
        <PostItem key={post.id} post={post} />
      ))}

      {/* Fallback demo posts if no data */}
      {!loading && !error && (!data || data.posts.length === 0) && (
        <>
          <PostItem
            post={{
              id: "1",
              author: {
                id: "1",
                name: "Jane Smith",
                username: "janesmith",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              content: "Just launched my new portfolio website! Check it out 🚀",
              image: "/placeholder.svg?height=400&width=600",
              createdAt: "2 hours ago",
              likes: 2500,
              comments: 482,
              hasLiked: false,
            }}
          />
          <PostItem
            post={{
              id: "2",
              author: {
                id: "2",
                name: "Alex Johnson",
                username: "alexj",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              content: "Beautiful sunset at the beach today! 🌅",
              image: "/placeholder.svg?height=400&width=600",
              createdAt: "3 hours ago",
              likes: 1800,
              comments: 234,
              hasLiked: true,
            }}
          />
        </>
      )}
    </div>
  )
}

function FeedSkeleton() {
  return (
    <div className="space-y-6 p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-64 w-full rounded-md" />
          <div className="flex space-x-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

