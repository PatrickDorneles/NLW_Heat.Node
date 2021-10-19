import { ErrorRequestHandler } from 'express'
import { InternalServerError } from 'http-errors'


export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const httpErr = new InternalServerError(`Internal Error: ${err}`)

	return res.status(httpErr.status).send(httpErr.message)
}