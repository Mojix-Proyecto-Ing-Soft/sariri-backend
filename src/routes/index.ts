import expreess from 'express'
import userRouter from './api/user'


const router = expreess.Router();

router.use('/api', userRouter);

export default router;