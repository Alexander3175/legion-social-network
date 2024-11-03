export default class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Користувач не Авторизований");
  }

  static UserNotRegistered() {
    return new ApiError(404, "Користувач не зареєстрований");
  }

  static badRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static ForbiddenError() {
    return new ApiError(403, "Доступ заборонено");
  }

  static NotFoundError() {
    return new ApiError(404, "Ресурс не знайдено");
  }

  static InternalError(message = "Внутрішня помилка сервера") {
    return new ApiError(500, message);
  }
}
