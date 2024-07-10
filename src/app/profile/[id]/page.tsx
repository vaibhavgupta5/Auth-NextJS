'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

// params are a superpower in next.. takes the url after profile/
function Page({params} : any) {


    type UserData = {
  email: string;
  username: string;
  isVerified: boolean;
};
    
    const router = useRouter()
    const [loading, setLoading] = useState(false)
  const [data, setData] = useState<UserData | null>(null);

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

      const getUserDetails = async () => {
        try {
          const response = await axios.get("/api/users/me");
          setData(response.data.data);
          console.log(data)
        } catch (error: any) {
          toast.error("Something went wrong, please try again later.");
          console.log("Server Issue");
         
        }
      };
    

      useEffect(() => {
        getUserDetails()
      },[params])

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[rgb(13,17,23)]">
    <div
      className="flex flex-col bg-white p-8 w-full m-2 rounded-lg border-black border-solid border-[5px] shadow-t-xl  shadow-white md:w-[30%] "
    >
       <h1 className="text-black text-4xl text-center font-bold ">
        {loading ? "Loading...": "User Profile"}
      </h1>

      <hr className='bg-black w-full text-black p-[1px] mt-4 mb-4 '/>

      <div className='text-black p-4 w-full text-center'><strong>UserId:</strong> {params.id}
          {data && <><br/><strong>Email:</strong> {data.email}
        <br/><strong>Username:</strong> {data.username}
        <br/><strong>Verified:</strong> {data.isVerified === true ? "Yes" : "No"}
        </div></>}
          <hr className='bg-black w-full text-black p-[1px] mt-4 mb-4'/>
      


      <button
        className={`w-full p-4 bg-black mt-2 text-lg hover:bg-[#0d1117] transition-all ease-linear hover:scale-105 `} onClick={() => logout()}>
        Logout
      </button>
    
    </div>
  </div>  )
}

export default Page
