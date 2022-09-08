import FavHotelDBInterface from '../models/FavHotelDBInterface'
import sqlConnection from '../config/sqlConnection';
import { Award, Hotel, Service } from '../models/hotelModels';


//singleton DB
export default class HotelDB implements FavHotelDBInterface {
    private static instance: HotelDB;

    private constructor() { }

    public static getInstance(): HotelDB {
        if (!HotelDB.instance) {
            HotelDB.instance = new HotelDB();
        }
        return HotelDB.instance;
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

    public deleteHotelInDB(location_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "DELETE FROM hotels WHERE location_id = ?",
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
                "INSERT INTO hotels (location_id, hotel_name, hotel_lat, hotel_lng, photo_url_large, photo_url_original, hotel_price, hotel_rating, hotel_address, num_reviews, hotel_ranking, contact_number, price_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [newHotel.location_id, newHotel.hotel_name, newHotel.hotel_lat, newHotel.hotel_lng, newHotel.photo_url_large, newHotel.photo_url_original, newHotel.hotel_price, newHotel.hotel_rating, newHotel.hotel_address, newHotel.num_reviews, newHotel.hotel_ranking, newHotel.contact_number, newHotel.price_level],
                (error, results, fields) => {
                    if (error) {
                        if (error.code === 'ER_DUP_ENTRY') {
                            resolve({ message: "Hotel already exists" });
                        } else reject({ message: "Error adding hotel" });
                    }
                    let awardsBindResult;
                    let servicesBindResult
                    if (newHotel.awards instanceof Array<string>) {
                        awardsBindResult = this.bindHotelAwards(newHotel.location_id, newHotel.awards as Array<string>);
                    }

                    if (newHotel.services instanceof Array<string>) {
                        servicesBindResult = this.bindHotelServices(newHotel.location_id, newHotel.services as Array<string>);
                    }

                    Promise.all([awardsBindResult, servicesBindResult]).then((result) => {
                        resolve({ message: "Hotel added" });
                    }).catch((error) => {
                        this.deleteHotelInDB(newHotel.location_id);
                        reject({ message: "Error adding hotel" });
                    });
                }
            );
        });
    }

    public awardExists(award_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "SELECT * FROM awards WHERE award_id = ?",
                [award_id],
                (error, results, fields) => {
                    if (error) reject(error);

                    if ((results as Array<any>).length > 0) {
                        resolve({ awardExists: true });
                    } else {
                        resolve({ awardExists: false });
                    }
                }
            );
        });
    }

    public bindHotelAwards(location_id: string, awards: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            awards.forEach((award) => {
                this.awardExists(award).then((result) => {
                    if (result.awardExists) {
                        sqlConnection.query(
                            "INSERT INTO hotel_awards (location_id, award_id) VALUES (?, ?)",
                            [location_id, award],
                            (error, results, fields) => {
                                if (error) reject(error);
                            }
                        );
                    }
                }).catch((error) => {
                    reject(error);
                });
            });
            resolve({ message: "Awards binded" });
        });
    }

    public async serviceExists(service_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "SELECT * FROM services WHERE service_id = ?",
                [service_id],
                (error, results, fields) => {
                    if (error) reject(error);

                    if ((results as Array<any>).length > 0) {
                        resolve({ serviceExists: true });
                    } else {
                        resolve({ serviceExists: false });
                    }
                }
            );
        });
    }

    public async bindHotelServices(location_id: string, services: string[]): Promise<any> {
        return new Promise( async (resolve, reject) => {
            services.forEach(async (service) => {
                this.serviceExists(service).then((result) => {
                    if (result.serviceExists) {
                        sqlConnection.query(
                            "INSERT INTO hotel_services (location_id, service_id) VALUES (?, ?)",
                            [location_id, service],
                            (error, results, fields) => {
                                if (error) reject(error);
                            }
                        );
                    }
                }).catch((error) => {
                    reject(error);
                });
            });
            resolve({ message: "Services binded" });
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

    public toogleHotelFav(userId: string, location_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // hotel existe?
            this.checkHotelExist(location_id).then((result) => {
                if (result.length > 0) {
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
                } else {
                    reject({ message: "Hotel not found" });
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public getFavHotelsbyUser(userID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "SELECT h.location_id, h.hotel_name, h.hotel_lat, h.hotel_lng, h.photo_url_large, h.photo_url_original, h.hotel_price, h.hotel_rating, h.hotel_address, h.num_reviews, h.hotel_ranking, h.contact_number, h.price_level FROM hotels h INNER JOIN fav_hotels f ON h.location_id = f.location_id WHERE f.user_id = ?",
                [userID],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    const hotelsResult = results as Array<Hotel>;
                    this.getAwardsAndServices(hotelsResult).then((result) => {
                        resolve(result);
                    }).catch((error) => {
                        reject(error);
                    });
                }
            );
        });
    }

    public getHotelAwards(location_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "SELECT a.award_id, a.display_name, a.badge_url FROM hotel_awards hw INNER JOIN awards a ON hw.award_id = a.award_id WHERE hw.location_id = ?",
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

    public getHotelServices(location_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "SELECT * FROM hotel_services hs INNER JOIN services s ON hs.service_id = s.service_id WHERE hs.location_id = ?",
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


    public getHotels(): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "SELECT * FROM hotels",
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    const hotelsResult = results as Array<Hotel>;
                    this.getAwardsAndServices(hotelsResult).then((hotels) => {
                        resolve(hotels);
                    }).catch((error) => {
                        reject(error);
                    });
                }
            );
        });
    }

    private getAwardsAndServices(hotels: Hotel[]): Promise<any> {
        const hotelsResult: Hotel[] = [];
        return new Promise((resolve, reject) => {
            hotels.forEach((hotel) => {
                const { location_id } = hotel;
                this.getHotelAwards(location_id).then((awards: Award[]) => {
                    hotel.awards = awards;
                    this.getHotelServices(location_id).then((services: Service[]) => {
                        hotel.services = services;
                        hotelsResult.push(hotel);
                        if (hotelsResult.length === hotels.length) {
                            resolve(hotelsResult);
                        }
                    });
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    }

}