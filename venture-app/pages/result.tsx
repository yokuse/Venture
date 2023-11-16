import { useRouter } from "next/router";
import useSWR from 'swr'
import { fetchGetJSON } from '../utils/api-helpers'
import PrintObject from "../components/Layout/PrintObject";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useUser from "../lib/useUser";

export default function Result() {
    const router = useRouter();
    

    // const { data, error } = useSWR(
    //     router.query.session_id
    //       ? `/api/checkout_sessions/${router.query.session_id}`
    //       : null,
    //     fetchGetJSON
    //   )
      
    // if (error) return <div>failed to load</div>
    const { mutateUser } = useUser({
      redirectTo: "/",
      redirectIfFound: false,
    });

    return (
        <div className="p-2 mx-auto my-10 shadow-lg w-1/2">
         { /*data?.payment_intent?.status &&*/}<div className="flex justify-center  mx-auto"> <CheckCircleIcon  className="text-emerald-400 text-6xl"/> </div>
          <div className="flex justify-center "> <h1> Checkout Payment Result </h1> </div>
          <div className="flex justify-center ">  <h2>Status: Suceeded{/*data?.payment_intent?.status ?? 'loading...'*/}</h2></div>
          {/* { data?.payment_intent?.status &&<div > 
            <PrintObject content={data ?? 'loading...'} /> 
          </div>} */}
          <div className="flex justify-center ">
            <button className=" rounded px-44 py-2 bg-indigo-600 mt-10 mb-5 "  onClick={() => router.push("/")}>Return</button> 
          </div>
          

        </div>

        
    )
}