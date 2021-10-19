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

		return message
	}
}