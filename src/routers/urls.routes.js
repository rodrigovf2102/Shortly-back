import express from 'express';
import { authorization } from '../middlewares/authorization.middlewares.js';
import { urlShorten } from '../controllers/urls.controllers.js';

const urlsRouter = express.Router();

urlsRouter.post('/urls/shorten',authorization,urlShorten);

export default urlsRouter;