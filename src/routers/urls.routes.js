import express from 'express';
import { authorization } from '../middlewares/authorization.middlewares.js';
import { urlShorten } from '../controllers/urls.controllers.js';
import { urlShortenValidation } from '../middlewares/urls.middlewares.js';

const urlsRouter = express.Router();

urlsRouter.post('/urls/shorten',authorization,urlShortenValidation,urlShorten);

export default urlsRouter;