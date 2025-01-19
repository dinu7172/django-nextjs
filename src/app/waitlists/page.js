"use client"

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

const WAITLIST_API_URL = "/api/waitlists/"
export default function Page() {
  const {data, error, isLoading} = useSWR(WAITLIST_API_URL, fetcher)
  async function getData() {
    const response = await fetch("http://127.0.0.1:8001/api/hello")
    // const data = await response.json()
    console.log(data)
  }
  console.log("")
  const handleClick = async () => {
    await getData()
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button onClick={handleClick} className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" >
          Get Data
        </button>
        {error && <div className="text-black">Error: {error}</div>}
        {isLoading && <div className="text-black">Loading...</div>}
        {data && <div className="text-black">Data: {JSON.stringify(data)}</div>}
       
      </main>
    </div>
  );
}
