import express from 'express';
import { postNewUser,postSignIn } from '../controllers/users.controllers.js';
import {newUserValidations,signinValidations} from '../middlewares/users.middlewares.js'

const usersRouter = express.Router();

usersRouter.post('/signup',newUserValidations,postNewUser)
usersRouter.post('/signin',signinValidations,postSignIn)

export default usersRouter;