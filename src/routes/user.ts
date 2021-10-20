import { Router } from 'express'
import { authed } from './../middlewares/authenticated'
import { GetUserProfileService } from './../services/user/get-profile'

export const UserRouter = Router()

UserRouter.get('/profile', authed, async (req,res,next) => {
	const { auth_user_id } = req.body

	const service = new GetUserProfileService()

	try {
		const profile = await service.execute(auth_user_id)

		return res.json(profile)
	} catch (error) {
		next(error)
	}
})