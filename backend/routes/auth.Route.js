import express from 'express'
import { getUser, logout, Signin, Signup, updateProfile } from '../controllers/userAuth.controller.js'
const authRoute = express.Router()
import upload from '../middleware/multer.middleware.js'
import { loggedIn } from '../middleware/loggedIn.middleware.js'

authRoute.post('/signupForm',upload.single('photo') , Signup)
authRoute.post('/signinForm' , Signin)
authRoute.get('/me' , loggedIn, getUser)
authRoute.post('/logout',loggedIn, logout)
authRoute.put('/update-profile',loggedIn,upload.single('photo'), updateProfile)

export default authRoute
