import api from "../http";
import Respons from "../models/response/response.js";
import User from "../models/User.js";

export default class AuthService {
    static async login(email, password) {
        const response = await api.post('/login', { email, password });
        console.log("AuthServiceLOG API ResponseAUTH:", response.data);
        console.log("AuthServiceLOG User Data:", response.data.user);
        const user = new User(response.data.user.id, response.data.user.email, response.data.user.isActivated);
        const userData = new Respons(response.data.accessToken, response.data.refreshToken, user);
        console.log(userData)
        return userData;
    }
    static async registration(name, email, password) {
        const response = await api.post('/registration', { name, email, password });
        console.log("AuthServiceREG API ResponseAUTH:", response.data);
        console.log("AuthServiceREG User Data:", response.data.user);
        const user = new User(response.data.user.id, response.data.user.email, response.data.user.isActivated);
        const userData = new Respons(response.data.accessToken, response.data.refreshToken, user);
        return userData;
    }
    static async logout() {
        return api.post('/logout');
    }
}
