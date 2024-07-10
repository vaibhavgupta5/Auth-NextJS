import { User } from "@/Models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from 'bcryptjs'

// using mailtrap to do so.. dummy email

export const sendEmail = async ({email, emailType, userId}:any) =>{

    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        
        // setting new token in database

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                $set :{verifyToken: hashedToken, 
                verifyTokenExpiry: new Date(Date.now() + 3600000)
            }
            })
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                $set :{forgotPasswordToken: hashedToken, 
                forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
            }
            }) 
        }

        //copy paste fron mailtrap docs
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
            // url will be like - */verifyemail?token=276wfwqtdwe5r45wede , verifytoken page is already made and token in it that can be taken out using params.. dynaminic ur;
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to : ${emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"}
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
          }

          const mailResponder = await transport.sendMail(mailOption);

    } catch (error:any) {
       throw new Error(error.message)
    }
}
