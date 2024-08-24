import Head from "next/head"
import Footer from "./components/Footer"
import SearchBar from "./components/SearchBar"

export default function Home() {
  return (
    <>
      <Head>
        <link rel={"icon"} href={"./icon.svg"} type="image/svg"></link>
      </Head>
      <div className="flex flex-col justify-between h-screen">
        <div className={`flex flex-col mt-[20vh] items-center   bg-white z-0`}>
          <div className="text-2xl sm:text-4xl md:text-6xl mb-2 font-semibold bg-gradient-to-r from-[#4285F4] from-13% via-[#DB4437] via-40%  to-[#F4B400] inline-block text-transparent bg-clip-text">
            Live Weather
          </div>
          <SearchBar />
        </div>
        <Footer />
      </div>
    </>
  )
}
