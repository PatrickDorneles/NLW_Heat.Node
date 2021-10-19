import { prisma } from './../../prisma/index';
import { InternalServerError, Unauthorized } from 'http-errors';
import axios from "axios"
import { IAccessTokenResponse } from "../../models/auth/access-token-response"
import { IUserResponse } from "../../models/auth/user-response"
import { sign } from 'jsonwebtoken';

export class SignInService {
    
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token"

        try {
            const { data: acessTokenResponse } = 
                await axios.post<IAccessTokenResponse>(url, null, {
                params: {
                    client_id: process.env.GH_CLIENT_ID,
                    client_secret: process.env.GH_CLIENT_SECRET,
                    code,
                },
                headers: {
                    "Accept": "application/json"
                }
            })

            const { data: githubUser } = await axios.get<IUserResponse>(`https://api.github.com/user`, {
                headers: {
                    authorization: `Bearer ${acessTokenResponse.access_token}`
                }
            })

            let user = await prisma.user.findFirst({ 
                where: {
                    github_id: githubUser.id
                }
            })

            if(!user) {
                user = await prisma.user.create({
                    data: {
                        github_id: githubUser.id,
                        name: githubUser.name,
                        login: githubUser.login,
                        avatar_url: githubUser.avatar_url
                    }
                })
            }

            const token = sign({
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id
                }
            }, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: '1d'
            });

            return { token, user }
        } catch (error) {
            throw new Unauthorized("We couldn't authenticate you with Github")
        }
    }
}