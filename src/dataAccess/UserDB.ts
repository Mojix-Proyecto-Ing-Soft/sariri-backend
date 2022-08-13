import { NewUser } from "../models/user";
import UserDBInterface from "../models/UserDBInterface";
import sqlConnection from "../config/sqlConnection";


//singleton DB
export default class UserDB implements UserDBInterface {
    private static instance: UserDB;

    private constructor() {}

    public static getInstance(): UserDB {
        if (!UserDB.instance) {
            UserDB.instance = new UserDB();
        }
        return UserDB.instance;
    }

    public insertUserInDB(newUser: NewUser): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "INSERT INTO users (user_id, user_name, user_lastname, user_phone, user_email) VALUES (?, ?, ?, ?, ?)",
                [newUser.user_id, newUser.user_name, newUser.user_lastName, newUser.user_phone, newUser.user_email],
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