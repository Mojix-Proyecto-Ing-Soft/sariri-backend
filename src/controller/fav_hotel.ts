import { Request, Response } from "express";
import FavHotelDB from "../dataAccess/FavHotelDB";
import { Hotel } from "../models/hotel";


const favHotelDB = FavHotelDB.getInstance();

export const toogleFav = (req: Request, res: Response) => {
    const userID = req.params.id;
    const hotel: Hotel = req.body;

    favHotelDB.toogleHotelFav(userID, hotel).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    });
};