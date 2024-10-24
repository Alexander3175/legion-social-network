import api from "../http";
import User from "../models/User";
import Post from "../models/Post";

export default class UserService {
  static async fetchUsers() {
    try {
      const response = await api.get("/users");
      if (Array.isArray(response.data)) {
        const users = response.data.map(
          (userData) =>
            new User(userData.id, userData.email, userData.isActivated)
        );
        return users;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async fetchPosts() {
    try {
      const response = await api.get("/posts");
      if (Array.isArray(response.data)) {
        const posts = response.data.map((postData) => 
          new Post(postData._id,postData.user, postData.title, postData.content, postData.like, postData.createdAt)
        );        

        return posts;        
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

   async createPost() {
    try {
      const response = await api.get("/posts");
      if (Array.isArray(response.data)) {
        
        return ;
      } else {
        throw new Error("Invalid created format");
      }
    } catch (error) {
      console.error("Error created posts:", error);
      throw error;
    }
  }

  static async fetchUserById(userId) {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error; 
    }
  }
}
