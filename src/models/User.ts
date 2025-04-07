import mongoose, { Document, Schema, Types } from 'mongoose'

export interface IUser extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
    name: string;
}

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model<IUser>('User', userSchema)

export default User
