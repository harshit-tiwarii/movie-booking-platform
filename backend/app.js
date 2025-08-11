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

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(cookieParser())

await dbConnected()

app.use('/api/v1/userAuth', authRoute)



app.use(errorMiddleware)

export default app

