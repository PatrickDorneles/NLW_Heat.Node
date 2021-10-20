import { prisma } from './../../prisma/index'
export class GetUserProfileService {
	async execute(user_id: string) {
		return await prisma.user.findFirst({
			where: {
				id: user_id,
			},
			include: {
				messages: true
			}
		})
	}
}