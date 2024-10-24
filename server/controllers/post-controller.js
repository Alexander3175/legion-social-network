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
            const post = await postService.createPost({ user_id: userId, title, content });
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
    
    
    

}

export default new PostController();
