import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/Models/userModel";
import {NextRequest, NextResponse} from 'next/server'
import { getDataFromToken } from "@/helper/helpDataFromToken";

connect();

export async function GET(request: NextRequest){
    try {

        // extract data from token

        const userId = await getDataFromToken(request)

        const user = await User.findOne({_id : userId}).select("-password")
        
        return NextResponse.json({ message: "User Found", data: user }, {status: 200});
       
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {status: 500});
        
    }
}
