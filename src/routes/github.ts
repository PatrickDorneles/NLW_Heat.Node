import { Router } from 'express';

export const GitHubRouter = Router()

GitHubRouter.get('/', (req,res) => {
    const clientId = process.env.GH_CLIENT_ID
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}`
    res.redirect(url)
})