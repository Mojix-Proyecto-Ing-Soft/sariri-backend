import { Request, Response } from "express";
import HotelService from "../services/HotelService";
import { Coords } from '../models/coords';


export const getHotelsByLatLng = (req: Request, res: Response) => {
    const { bl_latitude, bl_longitude, tr_latitude, tr_longitude, max_places } = req.body;
    const coords: Coords = { bl_latitude, bl_longitude, tr_latitude, tr_longitude, max_places };
    
    HotelService.filterHotelsInBounds(coords).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    });
}

export const addHotel = (req: Request, res: Response) => {
    const { location_id, hotel_name, hotel_lat, hotel_lng, photo_url_large, photo_url_original, hotel_price, hotel_rating, hotel_address, num_reviews, hotel_ranking, contact_number, price_level, awards, services } = req.body;
    const hotel = { location_id, hotel_name, hotel_lat, hotel_lng, photo_url_large, photo_url_original, hotel_price, hotel_rating, hotel_address, num_reviews, hotel_ranking, contact_number, price_level, awards, services };

    HotelService.addHotel(hotel).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    });
}