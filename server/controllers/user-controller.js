import userService from "../service/user-service.js";
import { validationResult } from "express-validator";
import ApiError from "../exception/api-error.js";

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.badRequest("Помилка при валідації", errors.array())
        );
      }
      const { name, email, password } = req.body;
      const userData = await userService.registration(name, email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(ApiError.InternalError(e.message));
    }
  }
  async login(req, res, next) {
    try {
      let { email, password } = req.body;
      const userData = await userService.login(email, password);
      if (!userData) {
        return next(ApiError.UserNotRegistered());
      }
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(ApiError.InternalError(e.message));
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(ApiError.InternalError(e.message));
    }
  }
  async activate(req, res, next) {
    try {
      /*
            const activationLink = req.params.link
            await userService.activate(activationLink)
            res.redirect(process.env.CLIENT_URL);
            */
    } catch (e) {
      next(ApiError.InternalError(e.message));
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return next(ApiError.UnauthorizedError());
      }
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(ApiError.InternalError(e.message));
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUser();
      return res.json(users);
    } catch (e) {
      next(ApiError.InternalError(e.message));
    }
  }

  async updateUserProfile(req, res, next){
    try {
      const updatedUser = await userService.updateUserProfile(req.user.id, req.body);
      res.json(updatedUser);
    } catch (e) {
      next(ApiError.InternalError(e.message));
    }
    }
}

export default new UserController();
