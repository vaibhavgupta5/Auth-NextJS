'use client'
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      console.log("Login success", response.data);
      setLoading(false);
      router.push("/profile");
    } catch (error: any) {
      console.log("Server Issue");
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong, please try again later.");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUser({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    console.log(user);
    onSubmit();
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[rgb(13,17,23)]">
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="flex flex-col bg-white p-8 w-full m-2 rounded-lg border-black border-solid border-[5px] shadow-t-xl  shadow-white md:w-[25%] "
      >
        <h1 className="text-[#0d1117] text-4xl text-center pb-8 font-bold ">
          {loading ? "Loading..." : "LOGIN HERE "}
        </h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            id="email"
            className="w-full border-solid border-[1px] border-black p-4 rounded-sm text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            className="w-full border-solid border-[1px] border-black p-4 rounded-sm text-black"
          />
        </div>
        <button
          className={`w-full p-4 bg-black mt-6 text-lg hover:bg-[#0d1117] transition-all ease-linear hover:scale-105 `}
        >
          Login
        </button>
        <p className="text-black text-center pt-4">
          Not have Account?{" "}
          <Link
            href="/SignUp"
            className=" cursor-pointer underline font-semibold "
          >
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}
