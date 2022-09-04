import { Request, Response } from "express";
import { NewUser } from "../models/userModels";
import { UpdateValidUser } from "../validation/userValidator";
import UserService from "../services/UserService";


export const createUser = (req: Request, res: Response) => {
    const newUser: NewUser = req.body;
    UserService.createUser(newUser).then((result) => {
        res.status(201).send("User created");
    }).catch((error) => {
        res.status(500).send("Error creating user");
    });
};

export const getUserInfo = (req: Request, res: Response) => {
    const userId = req.params.id;
    UserService.getUserInfo(userId).then((result) => {
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
    UserService.updateUserInfo(userId, updateUser).then((result) => {
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

export const userExists = (req: Request, res: Response) => {
    const userId = req.params.id;
    UserService.userExists(userId).then((result) => {
        if((result as Array<any>).length > 0) res.status(200).send({ message:"User exists", userExists: true })
        else res.status(200).send({ message:"User doesn't exists", userExists: false })
    }).catch((error) => {
        res.status(500).send("Error checking user")
    });
}