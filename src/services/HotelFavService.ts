import { ValidHotel } from "../validation/hotelValidator";
import HotelDB from "../dataAccess/HotelDB";


export default class HotelFavService {

    private static favHotelDB: HotelDB = HotelDB.getInstance()

    public static hotelExists(location_id: string): Promise<any> {
        // logica de negocio
        return this.favHotelDB.checkHotelExist(location_id);
    }

    public static addHotel(newHotel: ValidHotel): Promise<any> {
        // logica de negocio
        return this.favHotelDB.addHotelInDB(newHotel);
    }

    public static addFavHotel(userId: string, location_id: string): Promise<any> {
        // logica de negocio
        return this.favHotelDB.addFavHotel(userId, location_id);
    }

    public static removeFavHotel(userId: string, location_id: string): Promise<any> {
        // logica de negocio
        return this.favHotelDB.removeFavHotel(userId, location_id);
    }

    public static toogleHotelFav(userId: string, location_id: string): Promise<any> {
        // logica de negocio
        return this.favHotelDB.toogleHotelFav(userId, location_id);
    }

    public static getFavHotels(userId: string): Promise<any> {
        // logica de negocio
        return this.favHotelDB.getFavHotelsbyUser(userId);
    }

}