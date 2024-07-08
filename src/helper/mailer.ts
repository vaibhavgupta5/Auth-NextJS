import { User } from "@/Models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}:any) =>{

    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)


        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken, 
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken, 
                forgotPasswordTokenExpiry: Date.now() + 3600000
            }) 
        }
         
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "db5070575bde11",
              pass: "dff51a539e5d7a"
            }
          });


          const mailOption = {
            from: 'vaibhav@zeta.dev', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify Your Password" : "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to : ${emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"}
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
          }

          const mailResponder = await transport.sendMail(mailOption);

    } catch (error:any) {
       throw new Error(error.message)
    }
}