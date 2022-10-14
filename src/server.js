import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/server.routes.js';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(router)

const port = process.env.API_PORT || 3000;

server.listen(port,()=>console.log('Server ON in PORT:',port));
