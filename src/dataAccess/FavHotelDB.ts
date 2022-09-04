import FavHotelDBInterface from '../models/FavHotelDBInterface'
import sqlConnection from '../config/sqlConnection';
import { Hotel } from '../models/hotelModels';


//singleton DB
export default class FavHotelDB implements FavHotelDBInterface {
    private static instance: FavHotelDB;

    private constructor() {}

    public static getInstance(): FavHotelDB {
        if (!FavHotelDB.instance) {
            FavHotelDB.instance = new FavHotelDB();
        }
        return FavHotelDB.instance;
    }

    public checkHotelExist(location_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "SELECT * FROM hotels WHERE location_id = ?",
                [location_id],
                (error, results, fields) => {

                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                }
            );
        });
    }

    public addHotelInDB(newHotel: Hotel): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "INSERT INTO hotels (location_id, hotel_name, hotel_lat, hotel_lng, photo_url, hotel_price) VALUES (?, ?, ?, ?, ?, ?)",
                [newHotel.location_id, newHotel.hotel_name, newHotel.hotel_lat, newHotel.hotel_lng, newHotel.photo_url, newHotel.hotel_price],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                }
            );
        });
    }

    public addFavHotel(userId: string, location_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "INSERT INTO fav_hotels (user_id, location_id) VALUES (?, ?)",
                [userId, location_id],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                }
            );
        });
    }

    public removeFavHotel(userId: string, location_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "DELETE FROM fav_hotels WHERE user_id = ? AND location_id = ?",
                [userId, location_id],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                }
            );
        });
    }

    public toogleHotelFav(userId: string, newHotel: Hotel): Promise<any> {
        const { location_id } = newHotel;
        return new Promise((resolve, reject) => {
            // hotel existe?
            this.checkHotelExist(location_id).then((result) => {
                if ((result as Array<any>).length === 0) {
                    // hotel no existe, lo agregamos
                    this.addHotelInDB(newHotel).catch((error) => {
                        reject(error);
                    });
                }
                // agregamos el hotel a favoritos
                this.addFavHotel(userId, location_id).then((result) => {
                    resolve({ message: "Hotel added to favs", isFavorite: true });
                }).catch((error) => {
                    if (error.code === 'ER_DUP_ENTRY') {
                        // hotel ya es favorito, lo quitamos
                        this.removeFavHotel(userId, location_id).then((result) => {
                            resolve({ message: "Hotel removed from favs", isFavorite: false });
                        }).catch((error) => {
                            reject(error);
                        });
                    } else reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public getFavHotelsbyUser(userID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "SELECT h.location_id, h.hotel_name, h.hotel_lat, h.hotel_lng, h.photo_url, h.hotel_price FROM fav_hotels fh INNER JOIN hotels h ON fh.location_id = h.location_id WHERE fh.user_id = ?",
                [userID],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                }
            );
        });
    }

}