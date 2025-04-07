import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

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
