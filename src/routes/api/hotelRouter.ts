import expreess from 'express'
import { checkDatabaseConnection } from '../../middlewares/userMiddlewares'
import { latLngValidation } from '../../middlewares/hotelListMiddleware';
import { getHotelsByLatLng } from '../../controller/hotelController';

const hotelRouter = expreess.Router();

hotelRouter.use(checkDatabaseConnection)

hotelRouter.post('/hotel-list', latLngValidation, getHotelsByLatLng);

export default hotelRouter;