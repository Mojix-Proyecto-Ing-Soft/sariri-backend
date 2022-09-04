import { NewUser } from './userModels'

export default interface UserDBInterface {
    insertUserInDB(newUser: NewUser): Promise<any>
    getUserById(userId: string): Promise<any>
    updateUserById(userId: string, newUser: NewUser): Promise<any>
}