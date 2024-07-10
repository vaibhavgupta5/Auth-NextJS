'use client'
import axios from 'axios'
import Link from 'next/link'
import { Router } from 'next/router'
import React, { useEffect, useState } from 'react'


function VerifyEmailPage() {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)    
    const [loading, setLoading] = useState(false)    


    const handleFormSubmit = async (e:any) => {
        setLoading(true)
        e.preventDefault()
        await verifyEmail()
    }


    const verifyEmail = async () =>{
        try {
            await axios.post("/api/users/verifyemail", {token})
            setVerified(true)
            setError(false)
            setLoading(false)
        } catch (error:any) {
            setError(true)
            setLoading(false)
            console.log(error.response.data)
        }
    }


    // takes out token after ?token= from url using windows.location
    useEffect(() =>{
        const userToken = window.location.search.split("=")[1]
        setToken(userToken || "")
    }, [])

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[rgb(13,17,23)]">
    <form onSubmit={(e) => handleFormSubmit(e)} className="flex flex-col bg-white p-8 w-full m-2 rounded-lg border-black border-solid border-[5px] shadow-t-xl  shadow-white md:w-[25%] ">
      <h1 className='text-[#0d1117] text-4xl text-center pb-4 font-bold '>{!loading ? "VERIFY YOUR ACCOUNT" : "VERIFYING"}</h1>

      <p className='text-black text-center overflow-hidden scroll-m-0'>{token ? token : "Bad Request"}</p>

      {verified ? (<><p className='text-black text-center text-lg font-semibold p-4'>Succesfully Verified</p> <Link href={"/login"} className={`w-full p-4 bg-black text-lg text-center hover:bg-[#0d1117] transition-all ease-linear hover:scale-105 `} >Login</Link></>) : <button className={`w-full p-4 bg-black mt-6 text-lg hover:bg-[#0d1117] transition-all ease-linear hover:scale-105 ` }>Verify</button>}

      {error && <p className='text-red-700 text-center pt-4 text-lg font-semibold'>Error</p>}

    </form>
  </div>
  )
}

export default VerifyEmailPage
