import { Request, Response } from "express";
import HotelFavService from "../services/HotelFavService";


export const toogleFav = (req: Request, res: Response) => {
    const userID = req.params.id;
    const location_id = req.body.location_id;

    HotelFavService.toogleHotelFav(userID, location_id).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    });
};

export const getFavHotels = (req: Request, res: Response) => {
    const userID = req.params.id;
    
    HotelFavService.getFavHotels(userID).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    });
}