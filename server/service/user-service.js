import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import EmailService from "./email-service.js";
import UserDto from "../datatransferobject/user-dto.js";
import ApiError from "../exception/api-error.js";
import tokenService from "./token-service.js";
import postModel from "../models/post-model.js";
import Post from "../models/post-model.js";

class UserService {
  async registration(name, email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw ApiError.badRequest("Користувач з таким email вже існує");
    }
    const passwordTransform = String(password);
    const saltnumber = 3;
    const salt = await bcrypt.genSalt(saltnumber);
    const hashPassword = await bcrypt.hash(passwordTransform, salt);
    const activatedLink = uuidv4();

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      activatedLink,
    });
    //await EmailService.sendActivationEmail(email, `${process.env.API_SITE}/api/activated/${activatedLink}`);

    const userDto = new UserDto(user);
    const tokens = tokenService.generaiteTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  /*
    async activate(activatedLink){
        const user = await userModel.findOne({activatedLink})
        if(!user){
            throw ApiError.badRequest('Некоректна силка ативації')
        }
        user.isActivated = true
        await user.save();
    }
        */
  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiError.badRequest("Користувач з таким email не був знайденний ");
    }
    const isPassEquals = await bcrypt.compare(String(password), user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest("Невірний пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generaiteTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }
    const user = await userModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generaiteTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUser() {
    const users = await userModel.find();
    return users;
  }

  async createPost({ user_id, title, content }) {
      if (!title || !content) {
        throw new ApiError(400, "Необхідні всі поля");
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
  }
  
  
  async getAllPost() {
    const posts = await postModel.find();
    return posts;
  }
}

export default new UserService();
