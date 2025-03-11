"use client"

import { useState } from "react"
import { useMutation } from "@apollo/client"
import { LIKE_POST, UNLIKE_POST, ADD_COMMENT } from "@/lib/graphql/quries"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, MessageSquare, Share2, Bookmark, MoreHorizontal, Flag, Trash2 } from "lucide-react"
import { formatNumber } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Author {
  id: string
  name: string
  username: string
  avatar: string
}

interface Post {
  id: string
  author: Author
  content: string
  image?: string
  createdAt: string
  likes: number
  comments: number
  hasLiked: boolean
}

export default function PostItem({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.hasLiked)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [isCommenting, setIsCommenting] = useState(false)
  const [comment, setComment] = useState("")
  const { toast } = useToast()

  const [likePost] = useMutation(LIKE_POST, {
    onError: () => {
      setLiked(false)
      setLikesCount((prev) => prev - 1)
      toast({
        variant: "destructive",
        title: "Failed to like post",
        description: "Please try again later",
      })
    },
  })

  const [unlikePost] = useMutation(UNLIKE_POST, {
    onError: () => {
      setLiked(true)
      setLikesCount((prev) => prev + 1)
      toast({
        variant: "destructive",
        title: "Failed to unlike post",
        description: "Please try again later",
      })
    },
  })

  const [addComment, { loading: isAddingComment }] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      setComment("")
      setIsCommenting(false)
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully!",
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to add comment",
        description: "Please try again later",
      })
    },
  })

  const handleLikeToggle = () => {
    if (liked) {
      setLiked(false)
      setLikesCount((prev) => prev - 1)
      unlikePost({ variables: { postId: post.id } })
    } else {
      setLiked(true)
      setLikesCount((prev) => prev + 1)
      likePost({ variables: { postId: post.id } })
    }
  }

  const handleAddComment = () => {
    if (!comment.trim()) return

    addComment({
      variables: {
        input: {
          postId: post.id,
          content: comment,
        },
      },
    })
  }

  return (
    <article className="p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <Link href={`/profile/${post.author.username}`} className="font-semibold hover:underline">
              {post.author.name}
            </Link>
            <p className="text-sm text-muted-foreground">{post.createdAt}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Bookmark className="mr-2 h-4 w-4" />
              <span>Save post</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Flag className="mr-2 h-4 w-4" />
              <span>Report post</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete post</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p>{post.content}</p>

      {post.image && (
        <img
          src={post.image || "/placeholder.svg"}
          alt="Post content"
          className="rounded-md w-full object-cover max-h-96"
        />
      )}

      <div className="flex items-center justify-between pt-2">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${liked ? "text-red-500" : ""}`}
          onClick={handleLikeToggle}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          <span>{formatNumber(likesCount)}</span>
        </Button>

        <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => setIsCommenting(true)}>
          <MessageSquare className="h-4 w-4" />
          <span>{formatNumber(post.comments)}</span>
        </Button>

        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>

        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Bookmark className="h-4 w-4" />
          <span>Save</span>
        </Button>
      </div>

      <CommentDialog
        isOpen={isCommenting}
        onClose={() => setIsCommenting(false)}
        comment={comment}
        setComment={setComment}
        onSubmit={handleAddComment}
        isSubmitting={isAddingComment}
        post={post}
      />
    </article>
  )
}

function CommentDialog({
  isOpen,
  onClose,
  comment,
  setComment,
  onSubmit,
  isSubmitting,
  post,
}: {
  isOpen: boolean
  onClose: () => void
  comment: string
  setComment: (value: string) => void
  onSubmit: () => void
  isSubmitting: boolean
  post: Post
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a comment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{post.createdAt}</p>
              <p className="mt-1">{post.content}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSubmit} disabled={isSubmitting || !comment.trim()}>
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

