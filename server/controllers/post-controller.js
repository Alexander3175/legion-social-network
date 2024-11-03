import postModel from "../models/post-model.js";
import postService from "../service/post-service.js";

class PostController {
  async getPosts(req, res, next) {
    try {
      const posts = await postService.getAllPost();
      return res.json(posts);
    } catch (e) {
      next(e);
    }
  }

  async createPost(req, res, next) {
    try {
        const { title, content } = req.body;
        const userId = req.user.id;

        console.log("Received data:", { title, content, userId, file: req.file });

        let filePath = null;
        if (req.file) {
            filePath = req.file.path;
            console.log("Received file path:", filePath);
        }

        const post = await postService.createPost({
            user_id: userId,
            title,
            content,
           file: filePath.replace(/\\/g, '/'),
        });

        return res.json(post);
    } catch (e) {
        next(e);
    }
}

  

  async getUserId(req, res, next) {
    const userId = req.params.id;
    try {
      const user = await postService.getUserId(userId);

      if (!user) {
        return res.status(404).json({ message: "Користувача не знайдено" });
      }

      return res.json({
        _id: user._id,
        name: user.name,
      });
    } catch (error) {
      console.error("Error in getUserId:", error);
      next(error);
    }
  }
  async like(req, res, next) {
    const postId = req.params.id;
    const userId = req.user.id;
  
    try {
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).send('Пост не знайдено');
        }
        
        await postService.like(post, userId);
        await post.save();
        
        return res.status(200).send(post);
    } catch (e) {
        console.error(e);
        return res.status(500).send('Помилка сервера');
    }
  }
  
}

export default new PostController();
