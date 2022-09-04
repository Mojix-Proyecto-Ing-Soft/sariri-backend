import expreess from 'express'
import hotelFavRouter from './api/hotelFavRouter';
import userRouter from './api/userRouter'


const router = expreess.Router();

router.use('/api', [userRouter, hotelFavRouter]);

export default router;