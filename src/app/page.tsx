"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

//home page
export default function Home() {
  const router = useRouter();

  // Added redirection that when visites */ it redirects to */login
  useEffect(() => {
    router.push("/Login");
  },[]);

  return <>Home</>;
}
