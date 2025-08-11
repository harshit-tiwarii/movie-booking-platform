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
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    credentials: true, 
};
app.use(cors(corsOptions))
app.use(cookieParser())

await dbConnected()

app.use('/api/v1/userAuth', authRoute)



app.use(errorMiddleware)

export default app

