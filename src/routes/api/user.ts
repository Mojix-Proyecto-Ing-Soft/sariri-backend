import express from 'express'
import { checkDatabaseConnection, newUserValidate, updateUserValidate } from '../../middlewares/user'
import { createUser, getUserInfo, updateUserInfo, userExists } from '../../controller/user';

const userRouter = express.Router();

userRouter.use(checkDatabaseConnection)

userRouter.post('/user', [newUserValidate], createUser); // endpoint - middleware - controller
userRouter.get('/user/:id', getUserInfo);
userRouter.patch('/user/:id', [updateUserValidate], updateUserInfo);
userRouter.get('/user-exist/:id', userExists);

export default userRouter;