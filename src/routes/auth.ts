import { Router } from 'express'
import { register, login } from '../controllers/authController'
import authMiddleware, { AuthRequest } from '../middleware/authMiddleware'

const router = Router()

router.get('/me', authMiddleware, (req: AuthRequest, res) => {
    res.json({
        success: true,
        user: req.user
    })
})
router.post('/register', register)
router.post('/login', login)

router.post('/logout', (req, res) => {
    res.clearCookie('session')
    res.json({ success: true, message: 'Çıkış yapıldı' })
})
export default router
