import User from "../models/userModel";
import AppError from "../utils/appError";

export class UserService{

    async updateUser(id:string,name:string,email:string){
        const user = await User.findById(id)
        if(!user) throw new AppError(404,'User not found')
        user.name =name
        user.email = email
        await user.save()
        return user
    }

    async getAllUsers(){
        const users = await User.find()
        return users
    }

    async getUserById(id:string){
        const user = await User.findById(id)
        if(!user) throw new AppError(404,'User not found')
        return user
    }

    async deleteUser(id:string){
        const user = await User.findById(id)
        if(!user) throw new AppError(404,'User not found')
        await user.deleteOne()
    }
    
}