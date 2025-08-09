import userModel from "../models/User.Model.js";
import AppError from "../utils/AppError.util.js";
import jwt from 'jsonwebtoken'

const loggedIn = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next(new AppError('Please login again', 401))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)

        if (!user) {
            return next(new AppError('user not found', 404))
        }
        req.user = user
        next()
    } catch (error) {
        return next(new AppError(error.message, 401))
    }
}

export { loggedIn }