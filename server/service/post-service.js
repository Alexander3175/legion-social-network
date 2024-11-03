import userModel from "../models/user-model.js";
import ApiError from "../exception/api-error.js";
import postModel from "../models/post-model.js";
import Post from "../models/post-model.js";

class PostService {
  async createPost({ user_id, title, content, file}) {
    if (!title || !content) {
      throw new ApiError(400, "Необхідні всі поля");
    }
    const newPost = new Post({
      user: user_id,
      title,
      content,
      like: 0,
      createdAt: new Date(), 
      file
  });
  

  try {
    await newPost.save();
} catch (error) {
    console.error("Помилка під час створення Поста:", error);
    throw new ApiError(500, "Не вдалося створити пост");
}
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

  async like(post, userId) {
    if (post.likedBy.includes(userId)) {
      post.like -= 1;
      post.likedBy.pull(userId);
    } else {
      post.like += 1;
      post.likedBy.push(userId);
    }
  }
}
export default new PostService();
