'use client'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function SignupPage() {

    const router = useRouter()
    
    const [user, setUser] = useState({
        email: "",
        password : "",
        username : ""
    })

    interface FormData {
      email: string;
      password: string;
      username: string;      
}

    const [buttonDisabled, setButtonDisabled] = useState(true)
    
    const [sendemail, setSendEmail] = useState(false)
    
    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState(false)

    const onSubmit = async (formData : FormData) => {
        try {
            
                setLoading(true)
                setButtonDisabled(true)
                const response = await axios.post("/api/users/signup", formData)

                console.log("Signup success", response.data)
                setLoading(false)
                setSendEmail(true)
                setErrors(false)

        } catch (error: any) {
            console.log("Server Issue")
            console.log(error)
            setLoading(false)
            setErrors(true)
            toast.error("Something went wrong, please try again later.")
        }
    }


    const handleFormSubmit = (e:any) => {
        e.preventDefault()
        
        const formData : FormData = {
          email: e.target.email.value,
          password : e.target.password.value,
          username : e.target.username.value
        }
        
        setUser({
          email: e.target.email.value,
          password : e.target.password.value,
          username : e.target.username.value
        })
        onSubmit(formData);
    }


  return (
    <div className="h-screen w-full flex justify-center items-center bg-[rgb(13,17,23)]">
      <form onSubmit={(e) => handleFormSubmit(e)} className="flex flex-col bg-white p-8 w-full m-2 rounded-lg border-black border-solid border-[5px] shadow-t-xl  shadow-white md:w-[25%] ">
        <h1 className='text-[#0d1117] text-4xl text-center pb-8 font-bold '>{loading ? "Loading..." : "SIGN UP HERE "}</h1>
        <div className='flex flex-col space-y-4'>
         <input type="text" name="username" placeholder="Username" id="username" className='w-full border-solid border-[1px] border-black p-4 rounded-sm text-black'/>
        <input type="text" name="email" placeholder="Email" id="email" className='w-full border-solid border-[1px] border-black p-4 rounded-sm text-black'/>
        <input type="password" name="password" placeholder="Password" id="password" className='w-full border-solid border-[1px] border-black p-4 rounded-sm text-black'/>
        </div>

        {sendemail && <p className='text-black text-center mt-4 font-semibold'>Verify your Email, <Link className='underline font-extrabold' href="/">Check Mailbox</Link></p>}

        {errors && <p className='text-red-700 text-center mt-4 font-semibold'>Error : Retry Once</p>}

        <button  className={`w-full p-4 bg-black mt-6 text-lg hover:bg-[#0d1117] transition-all ease-linear hover:scale-105 ` }>Register</button>
        <p className='text-black text-center pt-4'>Not have Account? <Link href='/Login' className=' cursor-pointer underline font-semibold '>Login</Link></p>
      </form>
    </div>
  )
}

export default SignupPage
