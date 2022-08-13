// import { Request, Response, NextFunction } from "express"
// import { NewUser } from "../models/user";

/*
const isUserModel = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    
    const user: NewUser = {
        user_id: data.user_id,
        user_name: data.user_name,
        user_lastName: data.user_lastName,
        user_email: data.user_email,
        user_phone: data.user_phone
    };
    
    validate(user).then(errors => {
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        next();
    });
    
}
*/