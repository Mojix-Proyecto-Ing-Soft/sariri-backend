import { Request, Response, NextFunction } from 'express'
import UserDB from '../dataAccess/UserDB';
import { ValidHotel } from '../validation/fav_hotel';
import { validate } from 'class-validator';

const userDB = UserDB.getInstance();

export const userExistInDB = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    userDB.checkIfUserExists(userId).then((result) => {
        if ((result as Array<any>).length > 0) next();
        else res.status(404).send("User not found");
    }).catch((error) => {
        res.status(500).send("Error checking user")
    });
}

export const hotelFormatValidate = (req: Request, res: Response, next: NextFunction) => {
    const { location_id, hotel_name, hotel_lat, hotel_lng, photo_url, hotel_price } = req.body;
    const validHotel = new ValidHotel(location_id, hotel_name, hotel_lat, hotel_lng, photo_url, hotel_price);

    validate(validHotel, { validationError: { target: false } }).then(errors => {
        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            next();
        }
    });

}