import api from "../http";
import User from "../models/User";

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
