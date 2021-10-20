import { Router } from 'express'
import { CreateMessageService } from '../services/messages/create-message'
import { authed } from './../middlewares/authenticated'
import { GetLast3MessagesService } from './../services/messages/get-last-3-messages'

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

MessageRouter.get('/last3', async (req, res, next) => {
	const service = new GetLast3MessagesService()

	try {
		const messages = await service.execute()

		return res.json(messages)
	} catch (error) {
		next(error)
	}
})
