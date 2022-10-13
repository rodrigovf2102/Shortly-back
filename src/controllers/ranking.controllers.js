import { StatusCodes } from "http-status-codes";
import connection from "../db.js";

async function getRankingData(req, res) {
    try {
        const ranking = (await connection.query
            (`SELECT users.id,users.name,COUNT("URLs".url) AS "linksCount",
            SUM("URLs"."visitCount") AS "visitCount" FROM "userUrls"
            JOIN "URLs" ON "URLs".id="userUrls"."urlId"
            JOIN "users" ON "users".id="userUrls"."userId"
            GROUP BY users.id,users.name ORDER BY "visitCount" DESC, "linksCount" DESC
            LIMIT 10`)).rows;
        return res.status(StatusCodes.OK).send(ranking);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { getRankingData }