import * as geolib from 'geolib';
import { Coords } from '../models/coords';
import { Hotel } from '../models/hotelModels';
import HotelDB from '../dataAccess/HotelDB';


const hotelDB = HotelDB.getInstance();

export default class HotelService {
    public static filterHotelsInBounds(coords: Coords): Promise<any> {
        const { bl_latitude, bl_longitude, tr_latitude, tr_longitude } = coords;

        return new Promise((resolve, reject) => {
            hotelDB.getHotels().then((hotels) => {
                const hotelsinBounds = hotels.filter((hotel: Hotel) => {
                    return geolib.isPointInPolygon(
                        { latitude: hotel.hotel_lat, longitude: hotel.hotel_lng },
                        [
                            { latitude: bl_latitude, longitude: bl_longitude },
                            { latitude: tr_latitude, longitude: bl_longitude },
                            { latitude: tr_latitude, longitude: tr_longitude },
                            { latitude: bl_latitude, longitude: tr_longitude },
                        ]
                    );
                });
                resolve(hotelsinBounds);
            }).catch((error) => {
                reject({ error: "Error while getting hotels from DB" });
            });
        });
    }
}