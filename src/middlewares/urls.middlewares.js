import { StatusCodes } from "http-status-codes";
import joi from 'joi';
import { stripHtml } from 'string-strip-html';
import connection from "../db.js";

async function urlShortenValidation(req, res, next) {
    const { userId } = res.locals;
    const urlSchema = joi.object(
        {
            url: joi.string().pattern(new RegExp('^https:\/\/')).required()
        })
    if (req.body.url) stripHtml(req.body.url).result.trim();
    const { url } = req.body;
    const urlValidation = urlSchema.validate({ url: url });
    if (urlValidation.error) {
        const error = urlValidation.error.details[0].message;
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(error);
    }
    next();
}

export { urlShortenValidation }
