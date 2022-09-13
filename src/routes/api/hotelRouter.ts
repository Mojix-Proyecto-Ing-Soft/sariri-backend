import expreess from 'express'
import { checkDatabaseConnection } from '../../middlewares/userMiddlewares'
import { latLngValidation } from '../../middlewares/hotelListMiddleware';
import { getHotelsByLatLng, addHotel } from '../../controller/hotelController';
import { hotelFormatValidate } from '../../middlewares/hotelFavMiddleware';

const hotelRouter = expreess.Router();

hotelRouter.use(checkDatabaseConnection)

hotelRouter.post('/hotel-list', latLngValidation, getHotelsByLatLng);
hotelRouter.post('/hotel', hotelFormatValidate, addHotel);

export default hotelRouter;