import 'dotenv/config'
import express from 'express'
import { errorHandler } from './middlewares/error-handler'
import { httpErrorHandler } from './middlewares/http-error-handler'
import { MainRouter } from './routes'

const PORT = 9090

const app = express()

app.use(express.json())

app.get('/github', (req, res) => {
	res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}`)
})

app.use(MainRouter)

app.use(httpErrorHandler)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`🚀 Skyrocketing on https://localhost:${PORT}`)
})