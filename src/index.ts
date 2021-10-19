import 'dotenv/config'
import express from 'express'

const PORT = 9090

const app = express()

app.listen(PORT, () => {
    console.log(`🚀 Skyrocketing on https://localhost:${PORT}`)
})