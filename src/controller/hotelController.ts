import { Request, Response } from "express";
import HotelService from "../services/HotelService";
import { Coords } from '../models/coords';


export const getHotelsByLatLng = (req: Request, res: Response) => {
    const { bl_latitude, bl_longitude, tr_latitude, tr_longitude } = req.body;
    const coords: Coords = { bl_latitude, bl_longitude, tr_latitude, tr_longitude };
    
    HotelService.filterHotelsInBounds(coords).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    });
}