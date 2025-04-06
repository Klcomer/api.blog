import { Request, Response, NextFunction } from 'express'
import Session from '../utils/session'
import User from '../models/User'
import AppError from '../utils/appError'

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        name: string;
    };
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const session = req.cookies.session
        if (!session) throw new AppError(401, 'Giriş yapmalısınız.')

        const userId = Session.decrypt(session)
        const user = await User.findById(userId).select('-password')

        if (!user) throw new AppError(401, 'Geçersiz oturum.')

        req.user = {
            id: user._id.toString(),
            email: user.email,
            name: user.name
        }

        next()
    } catch (err) {
        next(err)
    }
}

export default authMiddleware
