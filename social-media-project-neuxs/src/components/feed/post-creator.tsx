"use client"

import type React from "react"

import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_POST } from "@/lib/graphql/mutation"
import { GET_POSTS } from "@/lib/graphql/queries"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Image, Video, Smile, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function PostCreator() {
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false)
  const [mediaType, setMediaType] = useState<"photo" | "video" | null>(null)
  const { toast } = useToast()

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    onCompleted: () => {
      setContent("")
      setImageUrl("")
      toast({
        title: "Post created",
        description: "Your post has been published successfully!",
      })
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to create post",
        description: error.message || "Please try again later",
      })
    },
    refetchQueries: [{ query: GET_POSTS }],
  })

  const handleSubmit = () => {
    if (!content.trim() && !imageUrl) return

    createPost({
      variables: {
        input: {
          content,
          mediaUrl: imageUrl || null,
          mediaType: imageUrl ? "image" : null,
        },
      },
    })
  }

  const handleMediaClick = (type: "photo" | "video") => {
    setMediaType(type)
    setIsMediaDialogOpen(true)
  }

  const handleMediaUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      setIsMediaDialogOpen(false)

      if (mediaType === "photo") {
        setImageUrl("/placeholder.svg?height=400&width=600")
        toast({
          title: "Image uploaded",
          description: "Your image has been uploaded successfully!",
        })
      } else {
        toast({
          title: "Video uploaded",
          description: "Your video has been uploaded successfully!",
        })
      }
    }, 1500)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="What's on your mind?"
            className="resize-none border-none shadow-none focus-visible:ring-0 p-0 text-base"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {imageUrl && (
            <div className="relative">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Post media"
                className="rounded-md max-h-80 w-full object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 rounded-full h-8 w-8 p-0"
                onClick={() => setImageUrl("")}
              >
                ×
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 flex items-center gap-1"
            onClick={() => handleMediaClick("photo")}
          >
            <Image className="h-5 w-5" />
            <span>Photo</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 flex items-center gap-1"
            onClick={() => handleMediaClick("video")}
          >
            <Video className="h-5 w-5" />
            <span>Video</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 flex items-center gap-1">
            <Smile className="h-5 w-5" />
            <span>Feeling</span>
          </Button>
        </div>

        <Button onClick={handleSubmit} disabled={loading || (!content.trim() && !imageUrl)}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            "Post"
          )}
        </Button>
      </div>

      <MediaUploadDialog
        isOpen={isMediaDialogOpen}
        onClose={() => setIsMediaDialogOpen(false)}
        type={mediaType}
        isUploading={isUploading}
        onSubmit={handleMediaUpload}
      />
    </div>
  )
}

function MediaUploadDialog({
  isOpen,
  onClose,
  type,
  isUploading,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  type: "photo" | "video" | null
  isUploading: boolean
  onSubmit: (e: React.FormEvent) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload {type === "photo" ? "Photo" : "Video"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="media-upload">Choose {type === "photo" ? "an image" : "a video"} to upload</Label>
            <Input id="media-upload" type="file" accept={type === "photo" ? "image/*" : "video/*"} />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

