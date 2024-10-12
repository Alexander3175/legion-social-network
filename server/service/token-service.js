import jwt from "jsonwebtoken";
import TokenSchema from "../models/token-model.js";
import tokenModel from "../models/token-model.js";

//playload - дані які вшиваються в токен
class TokenService{
    generaiteTokens(playload){
        const accessToken = jwt.sign(playload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
        const refreshToken = jwt.sign(playload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        
        return{
            accessToken,
            refreshToken
        }
    }

     validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            console.log('Token valid, userDataVALIDATE:', userData);
            if (!userData) {
                return ApiError.UnauthorizedError(); 
            }
            
            return userData;
        } catch (e) {
            return null;
        }
    }
     validateRefreshToken(refreshToken){
        try{
                const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                if (!userData) {
                    return ApiError.UnauthorizedError(); 
                }
                return userData;
            }
           catch (e) {
            return null;
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
    async removeToken(refreshToken){
        const tokenData = await tokenModel.deleteOne({ refreshToken });
        return tokenData
    }

    async findToken(refreshToken){
        const tokenData = await tokenModel.findOne({ refreshToken });
        return tokenData
    }
}

export default new TokenService();