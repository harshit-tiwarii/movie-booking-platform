import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'name is reqired'],
        minLength: [3,'name must be 3 character'],
        maxLength: [20,'name must be only 20 character']
    },
    email:{
        type: String,
        required: [true,'email is required'],
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: [6,'password is minimum 6 char'],
        select: false
    },
    photo:{
         public_id:{
            type: String
        },
        secure_url:{
            type: String
        },
    },
    role:{
        type: String,
        enum:['User','Admin'],
        default: 'User'
    }
},
{
    timestamps: true
}
)

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
   return next()
  }
try {
      this.password = await bcrypt.hash(this.password,10);
} catch (error) {
    next(error)
}
  next()
})

userSchema.methods.generateJwtToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

userSchema.methods.comparePassword = async function (PlainTextPassword){
  return await bcrypt.compare(PlainTextPassword,this.password)
}


const userModel = mongoose.model('User',userSchema);

export default userModel