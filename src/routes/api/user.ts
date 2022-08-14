import express from 'express'
import { checkDatabaseConnection, newUserValidate } from '../../middlewares/user'
import { createUser, getUserInfo } from '../../controller/user';

const userRouter = express.Router();

userRouter.post('/user', checkDatabaseConnection, newUserValidate, createUser); // endpoint - middleware - controller
userRouter.get('/user/:id', checkDatabaseConnection, getUserInfo);

export default userRouter;