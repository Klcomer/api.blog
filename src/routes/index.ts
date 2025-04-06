import { Router, Request, Response } from 'express';
import authRoutes from './auth'

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('API Çalışıyor ✅');
});

router.use('/auth', authRoutes)


export default router;
