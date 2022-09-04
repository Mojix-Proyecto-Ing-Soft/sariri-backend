import { NewUser } from "../models/userModels";
import UserDB from "../dataAccess/UserDB";
import { UpdateValidUser } from "../validation/userValidator";


export default class UserService {

    private static userDB: UserDB = UserDB.getInstance()


    public static createUser(newUser: NewUser): Promise<any> {
        // logica de negocio
        return this.userDB.insertUserInDB(newUser);
    }

    public static getUserInfo(userId: string): Promise<any> {
        // logica de negocio
        return this.userDB.getUserById(userId);
    }

    public static updateUserInfo(userId: string, updateUser: UpdateValidUser): Promise<any> {
        // logica de negocio
        return this.userDB.updateUserById(userId, updateUser);
    }

    public static userExists(userId: string): Promise<any> {
        // logica de negocio
        return this.userDB.checkIfUserExists(userId);
    }

}