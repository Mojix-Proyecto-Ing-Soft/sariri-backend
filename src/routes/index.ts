import expreess from 'express'
import hotelFavRouter from './api/fav_hotel';
import userRouter from './api/user'


const router = expreess.Router();

router.use('/api', [userRouter, hotelFavRouter]);

export default router;