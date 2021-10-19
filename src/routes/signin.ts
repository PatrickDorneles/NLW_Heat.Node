import { Router } from "express";
import { SignInService } from "../services/auth/signin";

export const SignInRouter = Router()

SignInRouter.post('/authenticate', async (req, res, next) => {
    const service = new SignInService();

    const { code } = req.body;

    try {    
        const result = await service.execute(code)
        
        return res.json(result)
    } catch (error) {
        next(error)
    }
})

SignInRouter.get('/callback', (req, res) => {
    const { code } = req.query

    return res.json(code)
})