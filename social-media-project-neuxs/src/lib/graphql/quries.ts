import { gql } from "@apollo/client"

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      content
      mediaUrl
      mediaType
      createdAt
      likes
      comments {
        id
        content
      }
      author {
        id
        name
        username
        avatar
      }
      hasLiked
    }
  }
`

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      content
      mediaUrl
      mediaType
      createdAt
      likes
      comments {
        id
        content
        createdAt
        author {
          id
          name
          username
          avatar
        }
      }
      author {
        id
        name
        username
        avatar
      }
      hasLiked
    }
  }
`

export const GET_USER_PROFILE = gql`
  query GetUserProfile($username: String!) {
    userProfile(username: $username) {
      id
      name
      username
      avatar
      bio
      followersCount
      followingCount
      isFollowing
      posts {
        id
        content
        mediaUrl
        mediaType
        createdAt
        likes
        comments {
          id
        }
      }
    }
  }
`

