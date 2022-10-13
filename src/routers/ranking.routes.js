import express from 'express';
import {getRankingData} from '../controllers/ranking.controllers.js'

const rankingRouter = express.Router()

rankingRouter.get('/ranking',getRankingData);

export default rankingRouter