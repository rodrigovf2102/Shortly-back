import connection from '../db.js';
import { StatusCodes } from 'http-status-codes';
import {nanoid} from 'nanoid';

async function urlShorten(req,res){
    const {url} = req.body;
    const {userId} = res.locals;
    const shortUrl = nanoid(8);
    try {

        await connection.query
        ('INSERT INTO "URLs" (url,"shortUrl","userId","visitCount") VALUES ($1,$2,$3,$4)',
        [url,shortUrl,userId,0]);

        const urlId = (await connection.query('SELECT id FROM "URLs" WHERE "shortUrl"=$1',[shortUrl])).rows[0].id

        await connection.query('INSERT INTO "userUrls" ("userId","urlId") VALUES ($1,$2)',
        [userId,urlId]);

        return res.status(StatusCodes.CREATED).send(JSON.stringify({shortUrl:shortUrl}))
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export {urlShorten}