import express from 'express'
import indexRoute from './routes/index.routes.js'
import morgan from 'morgan'
import cors from 'cors'

import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(morgan('dev'))
app.use(cors())

app.use(indexRoute)

export default app;