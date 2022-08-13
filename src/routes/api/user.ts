import express from 'express'
import { newUserValidate } from '../../middlewares/user'
import { createUser } from '../../controller/user';

const userRouter = express.Router();

userRouter.post('/user', newUserValidate, createUser); // endpoint - middleware - controller

export default userRouter;