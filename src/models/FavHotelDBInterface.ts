import { Hotel } from "./hotelModels"

export default interface FavHotelDBInterface {
    checkHotelExist(location_id: string): Promise<any>; // verify if the hotel is already in the DB
    addHotelInDB(newHotel: Hotel): Promise<any> // add the hotel in the hotels table
    addFavHotel(userId: string, location_id: string): Promise<any>; // add the hotel in user fav table (fav_hotels)
    removeFavHotel(userId: string, location_id: string): Promise<any>; // remove the hotel from user fav table (fav_hotels)
    toogleHotelFav(userId: string, location_id: string): Promise<any> // add or remove the hotel from user fav table (fav_hotels)
}