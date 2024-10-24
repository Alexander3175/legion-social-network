import express from "express";
import { body } from "express-validator";
import UserController from "../controllers/user-controller.js";
import PostController from '../controllers/post-controller.js';
import authMiddleware from "../middlewares/auth-middleware.js";

let router = express.Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password")
    .isLength({ min: 3, max: 32 })
    .withMessage("Пароль має бути від 3 до 32 символів."),
  UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activated/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers);
router.get("/posts", authMiddleware, PostController.getPosts);
router.get("/users/:id", authMiddleware, PostController.getUserId);
router.post("/createPost",  authMiddleware, PostController.createPost);

export default router;
