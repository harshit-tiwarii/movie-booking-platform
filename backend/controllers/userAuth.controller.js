import userModel from "../models/User.Model.js";
import AppError from "../utils/AppError.util.js";
import cloudinary from 'cloudinary';
import fs from 'fs';

const Signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return next(new AppError('All fields are required', 400))
    }
    if (password !== confirmPassword) {
        return next(new AppError('Password and confirm password not same', 400))
    }
    try {
        const userExisted = await userModel.findOne({ email });
        if (userExisted) {
            return next(new AppError('User already existed', 400))
        }

        const user = new userModel({
            name: name,
            email: email,
            password: password,
            photo: {
                public_id: email,
                secure_url: email
            }
        })
        try {
            if (req.file) {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'quickshow',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
                })
                if (result) {
                    user.photo.public_id = result.public_id
                    user.photo.secure_url = result.secure_url
                }
                fs.rmSync(`./uploads/${req.file.filename}`)
            }
        } catch (error) {
            return next(new AppError('file not uploaded,Try again !', 400))
        }
        await user.save()
        const cookieOptions = {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        };

        const token = user.generateJwtToken()
        res.cookie('token', token, cookieOptions)

        res.status(200).json({
            success: true,
            message: 'user created successfully',
            user
        })
    } catch (error) {
        return next(new AppError(error.message, 400))
    }
};

const Signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('All fields are required', 400))
        }
        const user = await userModel.findOne({ email }).select('+password');

        if (!user || ! await user.comparePassword(password)) {
            return next(new AppError('Email or password is incorrect', 400));
        }

        const token = user.generateJwtToken();

        const cookieOptions = {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        }
        res.cookie('token', token, cookieOptions)
        user.password = undefined;

        res.status(200).json({
            success: true,
            message: 'User login successfully',
            user
        })
    } catch (error) {
        return next(new AppError(error.message, 400))
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = req.user
        user.password = undefined;

        res.status(200).json({
            success: true,
            message: 'User data loaded successfully',
            user
        })
    } catch (error) {
        next(new AppError(error.message, 400))
    }
};

const logout = async (req, res, next) => {
    try {
        res.cookie('token', null, {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false
        });

        res.status(200).json({
            success: true,
            message: 'Logout successful'
        })
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { name } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        if (name) {
            user.name = name;
        }

        if (req.file) {
            // ✅ IMPROVEMENT: Only try to delete if a real public_id exists.
            // We check that it's not null and doesn't contain an '@' symbol.
            if (user.photo && user.photo.public_id && !user.photo.public_id.includes('@')) {
                await cloudinary.v2.uploader.destroy(user.photo.public_id);
            }

            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'quickshow',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill'
            });

            if (result) {
                user.photo.public_id = result.public_id;
                user.photo.secure_url = result.secure_url;
            }

            fs.rmSync(req.file.path);
        }

        await user.save();
        user.password = undefined;

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user
        });

    } catch (error) {
        // Also log the actual error on the backend for easier debugging
        console.error("PROFILE UPDATE FAILED:", error);
        return next(new AppError('Failed to process profile update', 400));
    }
};

export {
    Signup,
    Signin,
    getUser,
    logout,
    updateProfile
}