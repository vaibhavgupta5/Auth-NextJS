'use client'
import React, { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
export default function Profile() {


    const router = useRouter()
    const [data, setData] = useState("")
    const [loading, setLoading] = useState(false)
    
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      setData(response.data.data._id);
      //creates dynamic new route adds like */profile/6758gwwr6dr6 this page can be handeled by making a [id] folder in profile then create page.tsx for content
      router.push(`/profile/${response.data.data._id}`);
    } catch (error: any) {
      toast.error("Something went wrong, please try again later.");
      console.log("Server Issue");
     
    }
  };

     
  const logout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/logout");
      toast.success("Logged out successfully.");
      router.push("/login");
    } catch (error: any) {
      toast.error("Something went wrong, please try again later.");
      console.log("Server Issue");
     
    }
  };
  

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[rgb(13,17,23)]">
    <div
      className="flex flex-col bg-white p-8 w-full m-2 rounded-lg border-black border-solid border-[5px] shadow-t-xl  shadow-white md:w-[30%] "
    >
      <h1 className="text-black text-4xl text-center font-bold ">
        {loading ? "Loading...": "User Profile"}
      </h1>

      <hr className='bg-black w-full text-black p-[1px] mt-4 mb-4 '/>

      <button
        className={`w-full p-4 bg-[#0d1117]  text-lg hover:bg-black transition-all ease-linear hover:scale-105 `} onClick={()=> getUserDetails()} >
        See your Profile
      </button>

      <button
        className={`w-full p-4 bg-black mt-2 text-lg hover:bg-[#0d1117] transition-all ease-linear hover:scale-105 `} onClick={() => logout()}>
        Logout
      </button>
    
    </div>
  </div>
  )
}
