import { prisma } from './../../prisma/index'
export class GetLast3MessagesService {
	async execute() {
		const messages = await prisma.message.findMany({
			take: 3,
			orderBy: {
				created_at: 'desc'
			},
			include: {
				user: true
			}
		})

		return messages
	}
}