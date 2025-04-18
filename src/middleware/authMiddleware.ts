import { Request, Response, NextFunction } from 'express'
import Session from '../utils/session'
import User from '../models/userModel'
import AppError from '../utils/appError'
import { Types } from 'mongoose'

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
}

const isLoggedIn = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const session = req.cookies.session
        if (!session) throw new AppError(401, 'Giriş yapmalısınız.')

        const userId = Session.decrypt(session)
        const user = await User.findById(userId).select('-password')

        if (!user) throw new AppError(401, 'Geçersiz oturum.')

        req.user = {
            id: (user._id as Types.ObjectId).toString(),
            email: user.email,
            name: user.name,
            role: user.role
        }

        next()
    } catch (err) {
        next(err)
    }
}

export const restrictTo = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError(403, 'Bu işlem için yetkiniz yok.'));
        }
        next();
    };
};

export default isLoggedIn
