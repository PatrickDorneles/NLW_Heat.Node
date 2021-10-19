import { NextFunction, Request, Response } from 'express'
import { Unauthorized } from 'http-errors'
import { verify } from 'jsonwebtoken'
import { IPayload } from './../models/auth/payload'

export const authed = (req: Request, res: Response, next: NextFunction) => {
	const authToken = req.headers.authorization

	if (!authToken) {
		next(
			new Unauthorized('token.invalid')
		)
	}

	const [, token] = authToken.split(' ')

	try {
		const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

		req.body.user_id = sub

		return next()
	} catch (error) {
		next(
			new Unauthorized('token.expired')
		)
	}


}