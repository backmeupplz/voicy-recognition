// Get environment variables
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
// Dependencies
import 'reflect-metadata'
import * as Koa from 'koa'
import bodyParser from 'koa-bodyparser-ts'
import { loadControllers } from 'koa-router-ts'
import * as cors from '@koa/cors'

const app = new Koa()
const router = loadControllers(`${__dirname}/controllers`, { recurse: true })

// Run app
app.use(cors({ origin: '*' }))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
const server = app.listen(1337)
server.timeout = 60 * 60 * 1000

console.log('Koa application is up and running on port 1337')
