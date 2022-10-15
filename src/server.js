import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/server.routes.js';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(router)

const port = process.env.PORT;

server.listen(port,()=>console.log('Server ON in PORT:',port));
