import { Request, Response } from "express";
import { Hotel } from "../models/hotelModels";
import HotelFavService from "../services/HotelFavService";


export const toogleFav = (req: Request, res: Response) => {
    const userID = req.params.id;
    const hotel: Hotel = req.body;

    HotelFavService.toogleHotelFav(userID, hotel).then((result) => {
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