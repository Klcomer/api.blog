import mongoose, { Document, Schema } from 'mongoose';

export type UserRole = 'user' | 'admin' | 'developer' | 'crm';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    changedPasswordAfter(JWTTimestamp: number): boolean;
    createPasswordResetToken(): string;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'developer', 'crm'],
        default: 'user'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
}, {
    timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;