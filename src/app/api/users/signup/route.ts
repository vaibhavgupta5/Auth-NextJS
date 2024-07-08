import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/Models/userModel";
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helper/mailer";

console.log("ok")
connect();

export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User Already Exists"},{status: 400})
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)


        //sending email

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id} )


        return NextResponse.json({message: "User Created Successfully"},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, {status: 500});
    }
}