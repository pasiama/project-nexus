"use client";

import PostCreator from "./post-creator"
import PostItem from "./post-item"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import {useState, useEffect} from "react"
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await axios.get("https://api.ayrshare.com/api/posts"); // Replace with your actual API endpoint
        setPosts(data.data.posts); // Assuming your API response has a `posts` array
        console.log("data", data)
        return data
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

      {/* {data?.posts.map((post: any) => (
        <PostItem key={post.id} post={post} />
      ))} */}

      {/* Fallback demo posts if no data */}
      {!loading && !error && (
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

