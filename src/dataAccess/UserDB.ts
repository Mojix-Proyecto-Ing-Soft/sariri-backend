import { NewUser } from "../models/userModels";
import UserDBInterface from "../models/UserDBInterface";
import sqlConnection from "../config/sqlConnection";
import { UpdateValidUser } from "../validation/userValidator";


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

    public getUserById(userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query(
                "SELECT * FROM users WHERE user_id = ?",
                [userId],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                }
            );
        });
    }

    public updateUserById(userId: string, updateUser: UpdateValidUser): Promise<any> {
        let queryString = "UPDATE users SET ";
        const queryValues: string[] = [];

        Object.entries(updateUser).forEach(([key, value]) => {
            if(value !== undefined) {
                queryString += `${key} = ?, `;
                queryValues.push(value);
            }
        });

        queryString = queryString.slice(0, -2);

        queryString += ` WHERE user_id = ?`;
        queryValues.push(userId);

        return new Promise((resolve, reject) => {
            sqlConnection.query(queryString, queryValues, (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    public checkIfUserExists(userID: String): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlConnection.query("SELECT * FROM users WHERE user_id = ?", [userID], (error, results, fields) => {
                if(error) reject(error)
                resolve(results)
            });
        });
    }
}