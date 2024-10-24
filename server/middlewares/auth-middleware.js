import ApiError from "../exception/api-error.js";
import tokenService from "../service/token-service.js";

export default function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.error("Authorization header is missing");
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      console.error("Access token is missing after splitting the header");
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      console.error("Invalid access token or user data could not be retrieved");
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    console.error("Error in authorization middleware:", e);
    return next(ApiError.UnauthorizedError());
  }
}
