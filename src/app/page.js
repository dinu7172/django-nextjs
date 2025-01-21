"use client"
import useSWR from "swr";
import { useAuth } from "../components/authProvider";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const auth = useAuth()
  const {data, error, isLoading} = useSWR("http://127.0.0.1:8001/api/hello", fetcher)
  async function getData() {
    console.log("")
    const response = await fetch("http://127.0.0.1:8001/api/hello")
    if(response.ok){
      const data = await response.json()
    }
    console.log(data)
  }
  const handleClick = async () => {
    await getData()
  }
  return (
    <div className="flex items-center flex-col my-10 gap-5">
      <div>
        {auth.isAuthenticated ? "Hello user": "Hello guest"}
      </div>
        <button onClick={handleClick} className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" >
          Get Data
        </button>
        {error && <div className="text-black">Error: {error}</div>}
        {isLoading && <div className="text-black">Loading...</div>}
        {data && <div className="text-black">Data: {JSON.stringify(data)}</div>}
    </div>
  );
}
