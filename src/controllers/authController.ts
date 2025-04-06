import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'
import Session from '../utils/session'
import AppError from '../utils/appError'

export const register = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, password, name } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) throw new AppError(400, 'Bu email zaten kayıtlı.')

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ email, password: hashedPassword, name })
        res.status(201).json({ success: true, data: { email: user.email, name: user.name } })
    } catch (err) {
        next(err)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) throw new AppError(401, 'Kullanıcı bulunamadı.')

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new AppError(401, 'Şifre hatalı.')

        const token = Session.encrypt(user._id.toString())
        res.cookie('session', token, { httpOnly: true })

        res.json({ success: true, message: 'Giriş başarılı.' })
    } catch (err) {
        next(err)
    }
}
