import authService from "../services/authService.js"

import { makeAutoObservable } from 'mobx'
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
            console.log("STORE Response:", response);
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
            localStorage.setItem('token', response.accessToken)
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
}