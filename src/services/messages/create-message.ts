import { io } from '../../app'
import { prisma } from './../../prisma/index'


export class CreateMessageService {
	async execute(text: string, user_id: string) {
		const message = await prisma.message.create({
			data: {
				text,
				user_id
			},
			include: {
				user: true
			}
		})

		const infoWs = {
			text: message.text,
			user_id: message.user_id,
			created_at: message.created_at,
			user: {
				name: message.user.name,
				avatar_url: message.user.avatar_url
			}
		}

		io.emit('new_message', infoWs)

		return message
	}
}