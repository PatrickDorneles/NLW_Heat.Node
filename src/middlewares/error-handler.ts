import { ErrorRequestHandler } from 'express'
import createHttpError from 'http-errors'


export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const httpErr = new createHttpError.InternalServerError(`Internal Error: ${err}`)

	return res.status(httpErr.status).send(httpErr.message)
}