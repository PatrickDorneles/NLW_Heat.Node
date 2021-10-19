import 'dotenv/config'
import express from 'express'
import { errorHandler } from './middlewares/error-handler';
import { httpErrorHandler } from './middlewares/http-error-handler'

const PORT = 9090

const app = express()



app.use(httpErrorHandler)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`🚀 Skyrocketing on https://localhost:${PORT}`)
})