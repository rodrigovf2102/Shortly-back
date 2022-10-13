import { StatusCodes } from "http-status-codes";
import connection from '../db.js';

async function authorization(req,res,next){
    let token = req.headers.authorization;
   
    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).send('Error: empty token');
    }
    token = token.replace("Bearer ","");
    let user;
    try {
        user = (await connection.query('SELECT * FROM sessions WHERE token=$1',[token])).rows[0];
        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).send('Error: invalid token');
        }
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    res.locals.userId = user.userId;
    next();
}

export {authorization}