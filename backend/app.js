import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dbConnected from './config/db.config.js'
import authRoute from './routes/auth.Route.js'
import errorMiddleware from './middleware/error.middleware.js'

app.use(express.json())
app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true // 
}));
app.use(cookieParser())

await dbConnected()

app.use('/api/v1/userAuth', authRoute)



app.use(errorMiddleware)

export default app

