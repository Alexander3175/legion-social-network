import api from "../http";
import Respons from "../models/response/response.js";
import User from "../models/User.js";

export default class AuthService {
    static async login(email, password) {
        const response = await api.post('/login', { email, password });
        console.log("API ResponseAUTH:", response.data);
        console.log("User Data:", response.data.user);
        const user = User(response.data.user.email, response.data.user.isActivated, response.data.user.id);
        const userData = Respons(response.data.accessToken, response.data.refreshToken, user);
        console.log(userData)
        return userData;
    }
    static async registration(name, email, password) {
        const response = await api.post('/registration', { name, email, password });
        const user = new User(response.data.user.email, response.data.user.isActivated, response.data.user.id);
        const userData = Respons(user.id,response.data.accessToken, response.data.refreshToken)
        return userData;
    }
    static async logout() {
        return api.post('/logout');
    }
}
