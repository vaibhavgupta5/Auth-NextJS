import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

// we are checking the data in cookies and returning decoded jwt token

export const getDataFromToken = (request: NextRequest) => {

    try {
        //request.cookies.get("token?).value to get data from cookies, no need of cookie-parser in nextjs
        const token = request.cookies.get("token")?.value || ""

        // jwt.verify, verifies the token
       const decodedToken:any =  jwt.verify(token , process.env.SECRET_TOKEN!)


        // token contains id too as when created cookie token we can it id inside.
       return decodedToken.tokenData.id;

    } catch (error: any) {
        throw new Error(error.message)
    }

}
