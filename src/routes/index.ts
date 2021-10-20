import { Router } from 'express'
import { GitHubRouter } from './github'
import { MessageRouter } from './message'
import { SignInRouter } from './signin'
import { UserRouter } from './user'

export const MainRouter = Router()

MainRouter.use('/github', GitHubRouter)
MainRouter.use('/signin', SignInRouter)
MainRouter.use('/message', MessageRouter)
MainRouter.use('/user', UserRouter)