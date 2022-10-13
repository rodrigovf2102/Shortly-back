import express, { Router } from 'express';
import urlsRouter from './urls.routes.js';
import usersRouter from './users.routes.js';
import rankingRouter from './ranking.routes.js';

const router = express.Router();

router.use(usersRouter);
router.use(urlsRouter);
router.use(rankingRouter);

export default router;