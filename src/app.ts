import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { errorHandler } from './middlewares/error-handler'
import { httpErrorHandler } from './middlewares/http-error-handler'
import { MainRouter } from './routes'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: '*'
	}
})

app.use(cors())
app.use(express.json())

app.use(MainRouter)

app.use(httpErrorHandler)
app.use(errorHandler)

export { app, server, io }
