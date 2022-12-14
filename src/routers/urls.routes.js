import express from 'express';
import { authorization } from '../middlewares/authorization.middlewares.js';
import { urlShorten, getUrls, redirectToUrl, deleteUrl } from '../controllers/urls.controllers.js';
import { urlShortenValidation } from '../middlewares/urls.middlewares.js';

const urlsRouter = express.Router();

urlsRouter.post('/urls/shorten',authorization,urlShortenValidation,urlShorten);
urlsRouter.get('/urls/:id',getUrls);
urlsRouter.get('/urls/open/:shortUrl',redirectToUrl);
urlsRouter.delete('/urls/:id',authorization,deleteUrl);

export default urlsRouter;