import * as React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from "next/router";

const CheckEmail = () => {
    const router = useRouter();
    return (
        <>

        <div className="p-2 mx-auto my-10 shadow-lg w-1/2">
            <div className="flex justify-center  mx-auto"> <CheckCircleIcon  className="text-emerald-400 text-6xl"/> </div>
            <div className="flex justify-center "> <h1> Registered Successfully </h1> </div>
            <div className="flex justify-center ">  <p>Registration successful, please scan the QR in your mail box to setup 2FA with Google Authenticator App.</p></div>
          <div className="flex justify-center ">
            <button className=" rounded px-44 py-2 bg-indigo-600 mt-10 mb-5 "  onClick={() => router.push("/account/login")}>Return Home</button> 
          </div>
          

        </div>
        </>
    
    )
}

export default CheckEmail