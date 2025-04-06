import mongoose from 'mongoose'

export const SESSION_ENCRYPT_SECRET = process.env.SESSION_ENCRYPT_SECRET || 'gizli'
export const SESSION_ALGORITHM = 'aes-192-cbc'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string)
        console.log(`MongoDB Bağlandı: ${conn.connection.host}`)
    } catch (err: any) {
        console.error(`Veritabanı bağlantı hatası: ${err.message}`)
        process.exit(1)
    }
}

export default connectDB
