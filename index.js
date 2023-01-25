import Koa from 'koa'
import {koaBody} from 'koa-body'
import booksRoute from './routes/books.routes.js'
import 'dotenv/config'

const app = new Koa()

app.use(koaBody())

app.use(booksRoute.routes())

export default app