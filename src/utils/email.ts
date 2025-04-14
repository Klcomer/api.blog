import nodemailer from 'nodemailer';
import AppError from './appError';

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            throw new Error('Email credentials are missing in environment variables');
        }

        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

    }

    async sendPasswordResetEmail(email: string, resetToken: string) {
        try {
            const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Şifre Sıfırlama İsteği',
                html: `
                    <h1>Şifre Sıfırlama İsteği</h1>
                    <p>Merhaba,</p>
                    <p>Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:</p>
                    <a href="${resetURL}">${resetURL}</a>
                    <p>Bu link 1 saat sonra geçerliliğini yitirecektir.</p>
                    <p>Eğer bu isteği siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
                    <p>Saygılarımızla,</p>
                    <p>Blog Ekibi</p>
                `
            };
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.log({error});
            throw new AppError(500, 'Email gönderilirken bir hata oluştu.');
        }
    }
}

export const emailService = new EmailService(); 