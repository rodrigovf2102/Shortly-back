import connection from '../db.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid";

async function postNewUser(req, res) {
    const { name, email, password } = req.body;
    const newUser = {
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 12)
    }
    try {
       await connection.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3);',
            [newUser.name, newUser.email, newUser.password]);

        const userId = (await connection.query('SELECT id FROM users WHERE email=$1',[email])).rows[0].id;
        await connection.query('INSERT INTO "URLs" ("userId","visitCount") VALUES ($1,$2)',[userId,0]);

        const urlId = (await connection.query('SELECT id FROM "URLs" WHERE "userId"=$1',[userId])).rows[0].id;
        await connection.query('INSERT INTO "userUrls" ("userId","urlId") VALUES ($1,$2)',[userId,urlId]);

        return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function postSignIn(req, res) {
    const { email, password } = req.body;
    let authentication = false;
    try {
        const user = (await connection.query('SELECT * FROM users WHERE email=$1;', [email])).rows[0];
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Error: email not registred');
        }
        authentication = bcrypt.compareSync(password, user.password);
        if (!authentication) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Error: incorret password');
        }
        const token = uuidv4();
        await connection.query('INSERT INTO sessions ("userId",token) VALUES ($1,$2)', [user.id, token]);
        return res.status(StatusCodes.OK).send({ token: token });
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUserInfo(req, res) {
    const { userId } = res.locals;
    try {
        const user = (await connection.query('SELECT * FROM users WHERE id=$1',
            [userId])).rows[0];
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).sned('Error: user not found');
        }
        const userInfo = (await connection.query
            (`SELECT "URLs"."userId" AS "id",users.name,SUM("URLs"."visitCount") AS "visitCount"
            FROM "URLs" JOIN users ON "URLs"."userId"=users.id 
            WHERE users.id=$1 GROUP BY "URLs"."userId",users.name;`,[userId])).rows[0];
        const userShortenedUrls = (await connection.query
            (`SELECT "id","shortUrl","url","visitCount" FROM "URLs" 
            WHERE "userId"=$1 AND url IS NOT NULL`,[userId])).rows;
        if(userShortenedUrls.length>0){
            userInfo.shortenedUrls = userShortenedUrls;
            userInfo.visitCount = Number(userInfo.visitCount);
        }
        return res.status(StatusCodes.OK).send(userInfo);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { postNewUser, postSignIn, getUserInfo };