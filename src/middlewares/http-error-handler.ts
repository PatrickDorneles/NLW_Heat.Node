import { ErrorRequestHandler } from 'express'
import createHttpError from 'http-errors'

export const httpErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const isHttpError = createHttpError.isHttpError(err)
	
	if(isHttpError) {
		const httpErr = err as createHttpError.HttpError
		return res.status(httpErr.status).send({ message: httpErr.message })
	}

	next(err)
}