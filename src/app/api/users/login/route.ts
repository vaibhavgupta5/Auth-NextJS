import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/Models/userModel";
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User Not Exists, SignUp"},{status: 400})
        }

        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Wrong Password"},{status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign({tokenData}, process.env.SECRET_TOKEN!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Logged in Success"}, {status: 200}
        )

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {status: 500});
        
    }
}
