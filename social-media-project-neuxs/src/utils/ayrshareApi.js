import axios from "axios";

const API_URL = "https://api.ayrshare.com/api";
const API_KEY = "CF1B71CB-58674FD5-A0B6FE16-A57A0B75"; // Load from .env

// ✅ Create a Post
export const createPost = async (postText, socialMedia) => {
  try {
    const response = await axios.post(
      `${API_URL}/post`,
      { post: postText, socialMedia },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get a Post by ID
export const getPost = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/history/${id}`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete a Post
export const deletePost = async (id) => {
  try {
    await axios.delete(`${API_URL}/history/${id}`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    return true;
  } catch (error) {
    console.error("Error deleting post:", error.response?.data || error.message);
    throw error;
  }
};


export const getPosts = async (id) => {
      try {
        const response = await axios.get(`${API_URL}/history/${id}`, {
          headers: { Authorization: `Bearer ${API_KEY}` }
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching post:", error.response?.data || error.message);
        throw error;
      }
    };

    export const addLike = async (id) => {
      try {
        const response = await axios.post(`${API_URL}/posts/${post.id}/like`, {
          headers: { Authorization: `Bearer ${API_KEY}` }
        },  {
            action: liked ? "unlike" : "like",
          });
        return response.data;
      } catch (error) {
        console.error("Error fetching post:", error.response?.data || error.message);
        throw error;
      }
    };