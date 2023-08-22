import express from 'express'
import 'dotenv/config'
import indexRouter from './routers/index.js'
import cors from 'cors'

const { PORT } = process.env


const app = express()

app.use(cors())
app.use('/api', indexRouter)

app.listen(PORT, function () {
  console.log(`App started on port ${PORT}`)
})