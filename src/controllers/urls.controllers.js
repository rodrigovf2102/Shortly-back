import connection from '../db.js';
import { StatusCodes } from 'http-status-codes';
import {nanoid} from 'nanoid';

async function urlShorten(req,res){
    const {url} = req.body;
    const shortUrl = nanoid();
    
}

export {urlShorten}