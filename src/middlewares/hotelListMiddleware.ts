import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express'
import { ValidCoords } from '../validation/coordsValidator';

export const latLngValidation = (req: Request, res: Response, next: NextFunction) => {
    let { bl_latitude, bl_longitude, tr_latitude, tr_longitude, max_places } = req.body;
    const validCoords = new ValidCoords(bl_latitude, bl_longitude, tr_latitude, tr_longitude, max_places);
    
    if (bl_latitude && bl_longitude && tr_latitude && tr_longitude) {
        validate(validCoords).then((errors) => {
            if (errors.length > 0) {
                res.status(400).send(errors);
            } else {
                next();
            }
        });
    } else {
        res.status(400).send("Missing lat or lng");
    }
}