import bcrypt from 'bcrypt';
import User from '../models/userModel';
import Session from '../utils/session';
import AppError from '../utils/appError';
import { emailService } from '../utils/email';
import mongoose from 'mongoose';

export class AuthService {
    private validateRequiredFields(fields: { [key: string]: any }, fieldNames: string[]) {
        for (const fieldName of fieldNames) {
            if (!fields[fieldName]) {
                throw new AppError(400, `${fieldName} alanı zorunludur.`);
            }
        }
    }

    // Kullanıcı kaydı
    async registerUser(email: string, password: string, name: string) {
        try {
            // Validasyon
            this.validateRequiredFields({ email, password, name }, ['email', 'password', 'name']);

            const existingUser = await User.findOne({ email });
            if (existingUser) throw new AppError(400, 'Bu email zaten kayıtlı.');

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                email,
                password: hashedPassword,
                name,
                role: 'user'
            });

            return { email: user.email, name: user.name };
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, 'Kullanıcı kaydı sırasında bir hata oluştu.');
        }
    }

    // Kullanıcı girişi
    async loginUser(email: string, password: string) {
        try {
            // Validasyon
            this.validateRequiredFields({ email, password }, ['email', 'password']);

            const user = await User.findOne({ email });
            if (!user) throw new AppError(401, 'Kullanıcı bulunamadı.');

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new AppError(401, 'Şifre hatalı.');

            const token = Session.encrypt((user._id as mongoose.Types.ObjectId).toString());
            return token;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, 'Giriş sırasında bir hata oluştu.');
        }
    }

    async generateResetToken(email: string) {
        try {
            // Validasyon
            this.validateRequiredFields({ email }, ['email']);

            const user = await User.findOne({ email });
            if (!user) throw new AppError(404, 'Kullanıcı bulunamadı.');

            // Token oluşturma işlemi
            const token = Session.encrypt((user._id as mongoose.Types.ObjectId).toString());
            
            // Email gönderme
            await emailService.sendPasswordResetEmail(email, token);
            
            return { message: 'Şifre sıfırlama bağlantısı email adresinize gönderildi.' };
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, 'Token oluşturulurken bir hata oluştu.');
        }
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            // Validasyon
            this.validateRequiredFields({ token, newPassword }, ['token', 'newPassword']);

            // Token doğrulama ve şifre sıfırlama işlemi
            const userId = Session.decrypt(token);
            const user = await User.findById(userId);
            if (!user) throw new AppError(404, 'Geçersiz token.');

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            return { message: 'Şifreniz başarıyla güncellendi.' };
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, 'Şifre sıfırlama sırasında bir hata oluştu.');
        }
    }
}

export const authService = new AuthService();
