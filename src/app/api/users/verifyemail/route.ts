import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/Models/userModel";
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'

connect();


export async function POST(request: NextRequest){
    try {
        
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await User.findOne({verifyToken : token, verifyTokenExpiry: {$gt : Date.now()}})

        if(!user){
            return NextResponse.json({error: "No user Found"}, {status: 500})
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save()

        return NextResponse.json({message: "Verified Successfully"},{status:200})


    } catch (error:any) {
        return NextResponse.json({ error: error.message }, {status: 500});
    }
}

