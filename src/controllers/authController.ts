import { Request, Response, NextFunction } from 'express';
import { AuthService} from '../services/authService';

const authService = new AuthService();

// Kullanıcı kaydı
export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;
    const data = await authService.registerUser(email, password, name);
    res.status(201).json({ success: true, data });
};

// Kullanıcı girişi
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.cookie('session', token, { httpOnly: true });
    res.json({ success: true, message: 'Giriş başarılı.' });
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('session');
    res.json({ success: true, message: 'Çıkış yapıldı.' });
};

export const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const token = await authService.generateResetToken(email);
    res.json({ success: true, token });
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { token, newPassword } = req.body;
    const data = await authService.resetPassword(token, newPassword);
    res.json({ success: true, data });
};

