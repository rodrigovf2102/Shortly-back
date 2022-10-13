import express from 'express';
import { postNewUser,postSignIn,getUserInfo } from '../controllers/users.controllers.js';
import { authorization } from '../middlewares/authorization.middlewares.js';
import {newUserValidations,signinValidations} from '../middlewares/users.middlewares.js'

const usersRouter = express.Router();

usersRouter.post('/signup',newUserValidations,postNewUser);
usersRouter.post('/signin',signinValidations,postSignIn);
usersRouter.get('/users/me',authorization,getUserInfo);

export default usersRouter;