import { Router } from 'express';
import { GitHubRouter } from './github';
import { SignInRouter } from './signin';

export const router = Router()

router.use('/github', GitHubRouter)
router.use('/signin', SignInRouter)