import jwt from "jsonwebtoken";
import TokenSchema from "../models/token-model.js";

//playload - дані які вшиваються в токен
class TokenService{
    generaiteTokens(playload){
        const accessToken = jwt.sign(playload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(playload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return{
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await TokenSchema.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        else{
        const token = await TokenSchema.create({user: userId, refreshToken})
        return token
        }
    }
}

export default new TokenService();