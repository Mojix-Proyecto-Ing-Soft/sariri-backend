import { Request, Response } from "express";
import { NewUser } from "../models/user";
import UserDB from "../dataAccess/UserDB";
import { UpdateValidUser } from "../validation/user";

export const createUser = (req: Request, res: Response) => {
    const newUser: NewUser = req.body;
    const userDB = UserDB.getInstance();
    userDB.insertUserInDB(newUser).then((result) => {
        res.status(201).send("User created");
    }).catch((error) => {
        res.status(500).send("Error creating user");
    });
};

export const getUserInfo = (req: Request, res: Response) => {
    const userId = req.params.id;
    const userDB = UserDB.getInstance();
    userDB.getUserById(userId).then((result) => {
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send("User not found");
        }
    }).catch((error) => {
        res.status(500).send("Error getting user");
    });
};

export const updateUserInfo = (req: Request, res: Response) => {
    const userId = req.params.id;
    const updateUser: UpdateValidUser = new UpdateValidUser(req.body.user_name, req.body.user_lastName, req.body.user_phone);
    const userDB = UserDB.getInstance();
    userDB.updateUserById(userId, updateUser).then((result) => {
        console.log(result);
        if (result.affectedRows > 0) {
            if (result.changedRows > 0) {
                res.status(200).send("User updated");
            } else {
                res.status(200).send("Nothing updated");
            }
        } else {
            res.status(404).send("User not found");
        }
    }).catch((error) => {
        res.status(500).send("Error updating user");
    });
};