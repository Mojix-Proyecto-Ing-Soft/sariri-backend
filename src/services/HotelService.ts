import { Coords, PointCoords } from '../models/coords';
import { Hotel } from '../models/hotelModels';
import HotelDB from '../dataAccess/HotelDB';


export default class HotelService {
    private static hotelDB = HotelDB.getInstance();

    public static filterHotelsInBounds(coords: Coords): Promise<any> {
        const { bl_latitude, bl_longitude, tr_latitude, tr_longitude } = coords;
        return new Promise((resolve, reject) => {
            this.hotelDB.getHotels().then((hotels) => {
                const hotelsInBounds = hotels.filter((hotel: Hotel) => {
                    return this.inBounds({ lat: Number(hotel.hotel_lat), lng: Number(hotel.hotel_lng) }, bl_latitude, bl_longitude, tr_latitude, tr_longitude);
                });
                resolve(hotelsInBounds);
            }).catch((error) => {
                reject({ error: "Error while getting hotels from DB" });
            });
        });
    }

    public static addHotel(newHotel: Hotel): Promise<any> {
        return this.hotelDB.addHotelInDB(newHotel);
    }

    private static inBounds(point: PointCoords, bl_latitude: number, bl_longitude: number, tr_latitude: number, tr_longitude: number): boolean {
        let lng;
        const multLng = (point.lng - tr_longitude) * (point.lng - bl_longitude);
    
        if (tr_longitude > bl_longitude) {
            lng = multLng < 0;
        } else {
            lng = multLng > 0;
        }
    
        const lat = (point.lat - tr_latitude) * (point.lat - bl_latitude) < 0;
        return lng && lat;
    };
}