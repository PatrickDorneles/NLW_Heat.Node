import { Router } from 'express'
import { authed } from '../middlewares/authenticated'
import { CreateMessageService } from '../services/messages/create-message'

export const MessageRouter = Router()

MessageRouter.post('/', authed, async (req, res, next) => {
	const { text, user_id } = req.body

	const service = new CreateMessageService()

	try {
		const message = await service.execute(text, user_id)

		res.send(message)
	} catch (error) {
		next(error)
	}
})
