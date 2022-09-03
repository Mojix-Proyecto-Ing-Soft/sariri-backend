import express from 'express'
import { checkDatabaseConnection } from '../../middlewares/user'
import { toogleFav, getFavHotels } from '../../controller/fav_hotel';
import { userExistInDB, hotelFormatValidate } from '../../middlewares/fav_hotel';

const hotelFavRouter = express.Router();

hotelFavRouter.use(checkDatabaseConnection)

hotelFavRouter.post('/hotel-fav/user/:id', [hotelFormatValidate, userExistInDB], toogleFav);
hotelFavRouter.get('/hotels-fav/user/:id', userExistInDB, getFavHotels);

export default hotelFavRouter;