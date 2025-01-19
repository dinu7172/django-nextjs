"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

let logoutUrl = '/api/logout'

const page = () => {
    const router = useRouter();
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:""
            }
            const res = await fetch(logoutUrl, requestOptions)
            const data = await res.json()
            if(res.ok){
                console.log("Logged Out!")
                router.replace("/login")
            }
        } catch (error) {
            console.log("Error:- ", error)
        }
    }
  return (
    <div className='flex items-center flex-col my-10'>
        <p>Are you sure you want to logout?</p>
        <button onClick={(e) => handleClick(e)} className="px-4 py-2 bg-red-500 text-white ">
            Yes, Logout
        </button>
    </div>
  )
}

export default page