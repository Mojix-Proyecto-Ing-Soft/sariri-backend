import { Request, Response } from "express";
import { NewUser } from "../models/user";
import UserDB from "../dataAccess/UserDB";

export const createUser = (req: Request, res: Response) => {
    const newUser: NewUser = req.body;
    const userDB = UserDB.getInstance();
    userDB.insertUserInDB(newUser).then((result) => {
        res.status(201).send("User created");
    }).catch((error) => {
        res.status(500).send("Error creating user");
    });
};