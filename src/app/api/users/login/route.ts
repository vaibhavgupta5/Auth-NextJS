import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/Models/userModel";
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect(); // need to call connect func each time
// request: NextRequest takes data from frontend
export async function POST(request: NextRequest){
    try {
        //covertes into json format
        const reqBody = await request.json() 
        const {email, password} = reqBody
        console.log(reqBody)

        //finds a user from database
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User Not Exists, SignUp"},{status: 400})
        }

        // compared entered password to database pass using compare
        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Wrong Password"},{status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //creating token using jwt and feeds above tokenData
        const token = await jwt.sign({tokenData}, process.env.SECRET_TOKEN!, {expiresIn: "1d"})

        // sends response in frontend 
        const response = NextResponse.json({
            message: "Logged in Success"}, {status: 200}
        )

        //no need of cookie-parser, have directly access of cookies.
        response.cookies.set("token", token, {
            httpOnly: true,
            //httpOnly makes cookies only readable
        })

        return response
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {status: 500});
        
    }
}
