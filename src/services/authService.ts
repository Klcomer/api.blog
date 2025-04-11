import bcrypt from 'bcrypt';
import User from '../models/User'; // User modelini uygun şekilde import et
import Session from '../utils/session';
import AppError from '../utils/appError';

export class AuthService {
    // Kullanıcı kaydı
    async registerUser(email: string, password: string, name: string) {
        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) throw new AppError(400, 'Bu email zaten kayıtlı.');

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                email,
                password: hashedPassword,
                name
            });

            return { email: user.email, name: user.name };
        } catch (error) {
            throw new AppError(500, 'Kullanıcı kaydı sırasında bir hata oluştu.');
        }
    }

    // Kullanıcı girişi
    async loginUser(email: string, password: string) {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) throw new AppError(401, 'Kullanıcı bulunamadı.');

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new AppError(401, 'Şifre hatalı.');

            const token = Session.encrypt(user.id.toString());
            return token;
        } catch (error) {
            throw new AppError(500, 'Giriş sırasında bir hata oluştu.');
        }
    }

    async generateResetToken(email: string) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new AppError(404, 'Kullanıcı bulunamadı.');

        const token = Session.encrypt(user.id.toString());
        return token;
    }

    async resetPassword(token: string, newPassword: string) {
        const userId = Session.decrypt(token);  
        const user = await User.findOne({ _id: userId });
        if (!user) throw new AppError(404, 'Kullanıcı bulunamadı.');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return { success: true, message: 'Şifre başarıyla sıfırlandı.' };
    }   
}

export const authService = new AuthService();
