import Post from "../models/Post";
import api, { API_URL } from "../http/index";

export default class PostService {
  static async fetchPosts() {
    try {
      const response = await api.get("/posts");
      if (Array.isArray(response.data)) {
        const posts = response.data.map(
          (postData) =>
            new Post(
              postData._id,
              postData.user,
              postData.title,
              postData.content,
              postData.like,
              postData.createdAt,
              postData.file
            )
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

  async createPost(formData) {
    try {
        const response = await api.post(`${API_URL}/createPost`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.data && typeof response.data === 'object') {
            return response.data; 
        } else {
            throw new Error("Invalid created format");
        }
    } catch (error) {
        console.error("Error created posts:", error);
        throw error;
    }
}


  static async like(postId) {
    try {
      const response = await api.post(`/post/${postId}/like`);

      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
