import connection from '../db.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid";

async function postNewUser(req,res){
    const {name,email,password} = req.body;
    const newUser = {
        name: name,
        email: email,
        password: bcrypt.hashSync(password,12)
    }
    try {
        await connection.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3);',
        [newUser.name,newUser.email,newUser.password]);
        return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function postSignIn(req,res){
    const {email,password} = req.body;
    let authentication = false;
    try {
        const user = (await connection.query('SELECT * FROM users WHERE email=$1;',[email])).rows[0];
        if(!user){
           return res.status(StatusCodes.UNAUTHORIZED).send('Error: email not registred');
        }
        authentication = bcrypt.compareSync(password,user.password);
        if(!authentication){
            return res.status(StatusCodes.UNAUTHORIZED).send('Error: incorret password');
        }
        const token = uuidv4();
        await connection.query('INSERT INTO sessions ("userId",token) VALUES ($1,$2)',[user.id,token]);
        return res.status(StatusCodes.OK).send({token:token});
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export {postNewUser,postSignIn};