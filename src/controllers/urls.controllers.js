import connection from '../db.js';
import { StatusCodes } from 'http-status-codes';
import { nanoid } from 'nanoid';

async function urlShorten(req, res) {
    const { url } = req.body;
    const { userId } = res.locals;
    const shortUrl = nanoid(8);
    try {

        await connection.query
            ('INSERT INTO "URLs" (url,"shortUrl","userId","visitCount") VALUES ($1,$2,$3,$4)',
                [url, shortUrl, userId, 0]);

        const urlId = (await connection.query('SELECT id FROM "URLs" WHERE "shortUrl"=$1',
            [shortUrl])).rows[0].id

        await connection.query('INSERT INTO "userUrls" ("userId","urlId") VALUES ($1,$2)',
            [userId, urlId]);

        return res.status(StatusCodes.CREATED).send({ shortUrl: shortUrl })
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUrls(req, res) {
    const { id } = req.params;
    const urlId = Number(id);
    if (isNaN(urlId) || urlId % 1 !== 0) {
        return res.status(StatusCodes.NOT_FOUND).send('Error: url identification must be integer number');
    }
    try {
        const url = (await connection.query('SELECT * FROM "URLs" WHERE id=$1 AND url IS NOT NULL', [urlId])).rows[0];
        console.log(url)
        if (!url) {
            return res.status(StatusCodes.NOT_FOUND).send('Error: url id not found');
        }
        delete url.userId;
        delete url.visitCount;
        delete url.createdAt;
        return res.status(StatusCodes.OK).send(url);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function redirectToUrl(req, res) {
    const { shortUrl } = req.params;
    console.log(res);
    res.headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET",
        "Access-Control-Allow-Headers": "*"
    }
    if (shortUrl === null) {
        return res.status(StatusCodes.NOT_FOUND).send('Error: url not found');
    }
    try {
        const url = (await connection.query
            ('SELECT * FROM "URLs" WHERE "shortUrl"=$1', [shortUrl])).rows[0];
        if (!url) {
            return res.status(StatusCodes.NOT_FOUND).send('Error: url not found');
        }
        await connection.query('UPDATE "URLs" SET "visitCount"=$1 WHERE "shortUrl"=$2',
            [url.visitCount + 1, shortUrl]);
        return res.redirect(url.url);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteUrl(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;
    const urlId = Number(id);
    if (isNaN(urlId) || urlId % 1 !== 0) {
        return res.status(StatusCodes.NOT_FOUND).send('Error: url identification is a integer number');
    }
    try {
        const UrlUserId = (await connection.query('SELECT "userId","url" FROM "URLs" WHERE id=$1',
            [urlId])).rows[0];
        if (!UrlUserId) {
            return res.status(StatusCodes.NOT_FOUND).send('Error: url id not found');
        }
        if (UrlUserId.url === null) {
            return res.status(StatusCodes.NOT_FOUND).send('Error: url id can`t be erased');
        }
        if (UrlUserId.userId !== userId) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Error: url doesn`t belong to user');
        }
        await connection.query('DELETE FROM "userUrls" WHERE "urlId"=$1', [urlId]);
        await connection.query('DELETE FROM "URLs" WHERE id=$1', [urlId]);
        return res.status(StatusCodes.NO_CONTENT).send('Url deleted');
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { urlShorten, getUrls, redirectToUrl, deleteUrl }