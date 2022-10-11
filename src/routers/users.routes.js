import express from 'express';
import { postNewUser } from '../controllers/users.controllers.js';
import {newUserValidations} from '../middlewares/users.middlewares.js'

const usersRouter = express.Router();

usersRouter.post('/signup',newUserValidations,postNewUser)

export default usersRouter;