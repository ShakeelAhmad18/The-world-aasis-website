"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationalID,setNationalID]=useState('')
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
   
   if(!name || !email || !password || !nationalID){

    setError('All fields are necessary')

   }

 

   try {

     const res= await fetch('/api/register',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password,
            nationalID
        })
      })

      if(res.ok){
        const form=e.target;
        form.reset()
        toast.success('user Successfully registered')
      }else{
        console.log('User registeration failed')
      }

   } catch (error) {

    console.log('Errror During registration',error)
    
   }
   
  }

  return (
    <div className="grid place-items-center h-screen bg-primary-400">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4 text-primary-900">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="text-slate-800 rounded py-1"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
            <input className="text-slate-800 rounded py-1"
            onChange={(e) => setNationalID(e.target.value)}
            type="text"
            placeholder="National ID"
          />
          <input
            className="text-slate-800 rounded py-1"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            className="text-slate-800 rounded py-1"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}