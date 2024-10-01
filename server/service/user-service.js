import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import EmailService from "./email-service.js";
import TokenService from "./token-service.js";
import UserDto from "../datatransferobject/user-dto.js";

class UserService{
    async registration(name,email,password){
        const candidate = await userModel.findOne({email})
        if(candidate){
            throw new Error('Користувач з таким email вже існує')
        }
        const passwordTransform = String(password);
        const saltnumber = 3;
        const salt = await bcrypt.genSalt(saltnumber)
        const hashPassword = await bcrypt.hash(passwordTransform, salt)
        const activatedLink = uuidv4()
        const user = await userModel.create({name, email, password: hashPassword, activatedLink})
        await EmailService.sendActivationEmail(email, activatedLink);

        const userDto = new UserDto(user)
        const tokens = TokenService.generaiteTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return{
            ...tokens,
            user: userDto
        }
    }
}

export default new UserService();