import expreess from 'express'
import hotelFavRouter from './api/hotelFavRouter';
import userRouter from './api/userRouter'
import hotelRouter from './api/hotelRouter';


const router = expreess.Router();

router.use('/api', [userRouter, hotelFavRouter, hotelRouter]);

export default router;