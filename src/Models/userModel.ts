import mongoose from "mongoose"

// same as normal backend
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please Provide Username"],
        unique: true
    },
    email:{
        type: String,
        required: [true, "Please Provide Email"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please Provide Password"],
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken:{
        type: String,
    },
    forgotPasswordTokenExpiry:{
        type: Date,
    },
    verifyToken:{
        type: String,
    },
    verifyTokenExpiry:{
        type: Date,
    },
})

// checks if model already exists on server, if not creates new one using userSchema
export const User = mongoose.models.users || mongoose.model("users", userSchema)
