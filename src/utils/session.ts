import { createCipheriv, createDecipheriv, scryptSync } from 'crypto'
import { SESSION_ALGORITHM, SESSION_ENCRYPT_SECRET } from '../config'
import AppError from './appError'
const key = scryptSync(SESSION_ENCRYPT_SECRET, 'salt', 24)
const iv = Buffer.alloc(16, 0) // Initialization crypto vector


export default class Session {
    constructor() { }
    public static encrypt = (token: string) => {
        const cipher = createCipheriv(SESSION_ALGORITHM, key, iv)
        let encrypted = cipher.update(token, 'utf8', 'hex')
        encrypted += cipher.final('hex')
        return encrypted
    }

    public static decrypt = (session: string) => {
        try {
            const decipher = createDecipheriv(SESSION_ALGORITHM, key, iv)
            let decrypted = decipher.update(session, 'hex', 'utf8')
            decrypted += decipher.final('utf8')
            return decrypted
        } catch (error) {
            throw new AppError(401, "Unauthorized")
        }
    }
}