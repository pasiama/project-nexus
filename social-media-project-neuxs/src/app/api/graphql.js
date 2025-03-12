import { ApolloServer, gql } from "apollo-server-micro";
import axios from "axios";

// Load API key from environment variables
const API_KEY = process.env.AYRSHARE_API_KEY;

// 1️⃣ Define GraphQL Schema
const typeDefs = gql`
  type Post {
    id: ID
    status: String
    post: String
    socialMedia: [String]
  }

  type Query {
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(post: String!, socialMedia: [String]!): Post
    deletePost(id: ID!): Boolean
  }
`;

// 2️⃣ Define Resolvers to Call Ayrshare API
const resolvers = {
  Query: {
    getPost: async (_, { id }) => {
      try {
        const response = await axios.get(`https://api.ayrshare.com/api/history/${id}`, {
          headers: { "Authorization": `Bearer ${API_KEY}` }
        });
        return response.data;
      } catch (error) {
        throw new Error("Error fetching post: " + error.response.data);
      }
    }
  },
  Mutation: {
    createPost: async (_, { post, socialMedia }) => {
      try {
        const response = await axios.post(
          "https://api.ayrshare.com/api/post",
          { post, socialMedia },
          { headers: { "Authorization": `Bearer ${API_KEY}` } }
        );
        return response.data;
      } catch (error) {
        throw new Error("Error creating post: " + error.response.data);
      }
    },
    deletePost: async (_, { id }) => {
      try {
        await axios.delete(`https://api.ayrshare.com/api/history/${id}`, {
          headers: { "Authorization": `Bearer ${API_KEY}` }
        });
        return true;
      } catch (error) {
        throw new Error("Error deleting post: " + error.response.data);
      }
    }
  }
};

// 3️⃣ Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

export const config = { api: { bodyParser: false } };

// 4️⃣ Start Apollo Server
export default server.createHandler();
