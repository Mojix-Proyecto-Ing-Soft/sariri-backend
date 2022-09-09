import express from 'express'
import { checkDatabaseConnection } from '../../middlewares/userMiddlewares'
import { toogleFav, getFavHotels } from '../../controller/hotelFavController';
import { userExistInDB } from '../../middlewares/hotelFavMiddleware';

const hotelFavRouter = express.Router();

hotelFavRouter.use(checkDatabaseConnection)

hotelFavRouter.post('/hotel-fav/user/:id', [userExistInDB], toogleFav);
hotelFavRouter.get('/hotels-fav/user/:id', userExistInDB, getFavHotels);

export default hotelFavRouter;