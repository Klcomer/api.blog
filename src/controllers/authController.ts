import { Request, Response } from 'express';
import { AuthService} from '../services/authService';
import catchAsync from '../utils/catchAsync';

const authService = new AuthService();

// Kullanıcı kaydı
export const register = catchAsync(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const data = await authService.registerUser(email, password, name);
    res.status(201).json({ success: true, data });
});

// Kullanıcı girişi
export const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.cookie('session', token, { httpOnly: true });
    res.json({ success: true, message: 'Giriş başarılı.' });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie('session');
    res.json({ success: true, message: 'Çıkış yapıldı.' });
});

export const forgetPassword = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    const token = await authService.generateResetToken(email);
    res.json({ success: true, token });
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    const data = await authService.resetPassword(token, newPassword);
    res.json({ success: true, data });
});

