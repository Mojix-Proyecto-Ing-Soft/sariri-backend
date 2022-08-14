import express from 'express'
import { checkDatabaseConnection, newUserValidate, updateUserValidate } from '../../middlewares/user'
import { createUser, getUserInfo, updateUserInfo } from '../../controller/user';

const userRouter = express.Router();

userRouter.post('/user', checkDatabaseConnection, newUserValidate, createUser); // endpoint - middleware - controller
userRouter.get('/user/:id', checkDatabaseConnection, getUserInfo);
userRouter.patch('/user/:id', [checkDatabaseConnection, updateUserValidate], updateUserInfo);

export default userRouter;