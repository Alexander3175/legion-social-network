import axios from "axios"
import authService from "../services/authService.js"
import { makeAutoObservable } from 'mobx'
import { API_URL } from '../http/index.js';
export default class Store{

    user = {}
    isAuth = false
    constructor(){
        makeAutoObservable(this)
    }

    setAuth(bool){
        this.isAuth = bool
    }
    setUser(user){
        this.user = user
    }

    async login(email, password){
        try{
            const response = await authService.login(email,password)
            
            console.log("Store Login Response:", response);
            localStorage.setItem('token', response.accessToken)
            this.setAuth(true)
            this.setUser(response.user)
        } catch(e) {
            console.log(e)
        }
    }
    async registration(name, email, password){
        try{
            const response = await authService.registration(name, email,password)
            console.log('Store Registration:' + response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.user)
        } catch(e) {
            console.log(e)
        }
    }

    async logout(){
        try{
         await authService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
        } catch(e) {
            console.log(e)
        }
    }

    async checkAuth(){
        try{
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            console.log('Store CheckAuth:' + response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user);
        } catch(e) {
            console.log(e)
            this.setAuth(false);
        }
    }
}