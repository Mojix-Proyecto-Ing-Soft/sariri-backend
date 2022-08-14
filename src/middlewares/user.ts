import { Request, Response, NextFunction } from 'express'
import { ValidUser } from '../validation/user'
import { validate } from 'class-validator';
import { isDatabaseConnected } from '../config/sqlConnection';


export const newUserValidate = (req: Request, res: Response, next: NextFunction) => {
    const { user_id, user_name, user_lastName, user_phone, user_email } = req.body;
    const validUser = new ValidUser(user_id, user_name, user_lastName, user_email, user_phone);

    validate(validUser, { validationError: { target: false } }).then(errors => {
        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            next();
        }
    });
};

export const checkDatabaseConnection = (req: Request, res: Response, next: NextFunction) => {
    if (isDatabaseConnected) {
        next();
    } else {
        res.status(500).send("Error connecting to database");
    }

};