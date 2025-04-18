import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import catchAsync from '../utils/catchAsync';

const userService = new UserService();


export const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id, name, email } = req.body;
    const user = await userService.updateUser(id, name, email);
    res.status(200).json({ success: true, data: user });
});

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.status(200).json({success:true,data:users})
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.body;
    await userService.deleteUser(id);
    res.status(200).json({success:true,message:"User deleted successfully"});
});

export const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json({success:true,data:user})
});

 