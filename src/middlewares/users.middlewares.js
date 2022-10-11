import { StatusCodes } from "http-status-codes";
import joi from 'joi';
import { stripHtml } from 'string-strip-html';
import connection from '../db.js';

async function newUserValidations(req, res, next) {
    const newUserSchema = joi.object({
        name: joi.string().min(3).max(200).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(12).required(),
        confirmPassword: joi.string().min(4).max(12).required()
    })
    req.body.name = stripHtml(req.body.name).result.trim();
    req.body.email = stripHtml(req.body.email).result.trim();
    req.body.password = stripHtml(req.body.password).result.trim();
    req.body.confirmPassword = stripHtml(req.body.confirmPassword).result.trim();

    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send('Error: passwords don`t match');
    }
    const validUser = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }
    const validation = newUserSchema.validate(validUser, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(errors);
    }
    try {
        const user = await connection.query('SELECT * FROM users WHERE email=$1', [email]);
        if (user.rows.length > 0) {
            return res.status(StatusCodes.CONFLICT).send('Error: email already used');
        }    
    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    next()
}

export {newUserValidations}