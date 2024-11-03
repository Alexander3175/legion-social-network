import axios from "axios";
import authService from "../services/authService.js";
import { makeAutoObservable } from "mobx";
import api, { API_URL } from "../http/index.js";
export default class Store {
  user = {};
  isAuth = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }
  setUser(user) {
    this.user = user;
  }

  async login(email, password) {
    try {
      const response = await authService.login(email, password);
      localStorage.setItem("token", response.accessToken);
      this.setAuth(true);
      this.setUser(response.user);

      this.getUserProfile();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async registration(name, email, password) {
    try {
      const response = await authService.registration(name, email, password);
      console.log("Store Registration:" + response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.user);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      await authService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
      this.setAuth(false);
    }
  }

  async getUserProfile() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await api.get(`${API_URL}/users`);

      if (response.status === 200) {
        this.setUser(response.data);
        this.setAuth(true);
      } else {
        console.log("Не вдалося завантажити профіль користувача");
        this.setAuth(false);
      }
    } catch (e) {
      console.log("Помилка при завантаженні профілю користувача:", e);
      this.setAuth(false);
    }
  }

  async updateUserProfile(updatedData) {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Користувач не авторизований");
     const response = await api.put(`${API_URL}/user/profile`, updatedData)
     if (response.status === 200) {
      this.setUser(response.data); 
    } else {
      console.error("Не вдалося оновити профіль користувача");
    }
    } catch (e) {
      console.log(e);
    }
  }
}
