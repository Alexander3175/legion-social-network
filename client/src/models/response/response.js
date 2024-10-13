export default class User {
    constructor(accessToken, refreshToken, user) {
      this.user = user;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    }
  }
  