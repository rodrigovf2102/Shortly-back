import connection from '../db.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

async function postNewUser(req,res){
    const {name,email,password} = req.body;
    const newUser = {
        name: name,
        email: email,
        password: bcrypt.hashSync(password,12)
    }
    console.log(newUser.name)
    try {
        await connection.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)',
        [newUser.name,newUser.email,newUser.password]);
        return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export {postNewUser};