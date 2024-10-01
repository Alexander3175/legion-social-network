import UserService from "../service/user-service.js";


class UserController{
    async registration(req, res, next){
        try{
            const {name, email,password} = req.body
            const userData = await  UserService.registration(name,email,password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        }catch(e){
            console.log('User-controller - reg + ...>', e)
        }
    }
    async login(req, res, next){
        try{

        }catch(e){
            
        }
    }
    async logout(req, res, next){
        try{

        }catch(e){
            
        }
    }
    async activate(req, res, next){
        try{

        }catch(e){
            
        }
    }
    async refresh(req, res, next){
        try{

        }catch(e){
            
        }
    }
    async getuser(req, res, next){
        try{
            res.json(["123", "321"])

        }catch(e){
            
        }
    }
}

export default new UserController();