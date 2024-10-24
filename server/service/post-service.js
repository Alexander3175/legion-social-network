import userModel from "../models/user-model.js";
import ApiError from "../exception/api-error.js";
import postModel from "../models/post-model.js";
import Post from "../models/post-model.js";

class PostService {
  async createPost({ user_id, title, content }) {
    if (!title || !content) {
      throw new ApiError(400, "Необхідні всі поля");
    }
    const newPost = new Post({
      user: user_id, 
      title,
      content,
      like: 0,
      createdAt: Date.now(),
    });

    await newPost.save();
    return newPost;
  }

  async getAllPost() {
    const posts = await postModel.find();
    return posts;
  }

  async getUserId(userId) {
    const user = await userModel.findById(userId);
    if (!user) {
        throw new ApiError(404, "Користувача не знайдено");
    }
    return user; 
}
}
export default new PostService();
