"use client"
import { changeValue } from "@/lib/store/features/location/locationSlice"
import {
  faMagnifyingGlass,
  faMicrophone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { data } from "../../lib/data/locationData.js"

const SearchBar = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [writing, setWriting] = useState(false)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(false)
  const searchRef = useRef<any>(null)
  const [newData, setNewData] = useState(data)
  let count = 0
  const handleCross = (): void => {
    setWriting(false)
    setSearch("")
  }

  const handleSearch = () => {
    if (search == "") return
    alert("Please select a valid city")
  }

  const handleAutoFill = () => {
    setSelected(true)
  }
  const handleInput = (e: any) => {
    setSearch(e.target.value)
    const newD = data.filter(
      (d) =>
        d?.localityName?.toLowerCase().includes(search.toLowerCase()) ||
        d?.cityName?.toLowerCase().includes(search.toLowerCase())
    )
    setNewData(newD)
  }
  const closeSelected = (e: any) => {
    if (searchRef && !searchRef?.current?.contains(e.target)) {
      setSelected(false)
      return
    }
    setSelected(true)
    return
  }
  useEffect(() => {
    document.addEventListener("mousedown", closeSelected)
  }, [])
  useEffect(() => {
    if (search?.length > 0) {
      setWriting(true)
    } else {
      setWriting(false)
    }
  }, [search])
  const handleAutoSearchLocality = async (e: any) => {
    if (e?.target?.id) {
      const n = e?.target?.innerText
      setSearch(n)
      const options = {
        method: "GET",
        url: "https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data",
        params: { locality_id: e?.target?.id },
        headers: { "X-Zomato-Api-Key": process.env.NEXT_PUBLIC_API_KEY },
      }

      try {
        const { data } = await axios.request(options)
        if (data.status == 200) {
          const a = await data.locality_weather_data
          dispatch(changeValue(a))

          router.push(`/search/${n}`)
        } else if (data.status == 400) {
          alert(data.message)
        } else if (data.status == 500) {
          alert(data.message)
        }
      } catch (error) {
        alert("Something went wrong")
      }
    }
  }
  const handleAutoSearchLocation = async (e: any) => {
    if (e?.target?.id) {
      const id = e?.target?.id
      const latitude = id.split(" ")[1]
      const longitude = id.split(" ")[0]
      const n = e?.target?.innerText
      setSearch(n)

      const options = {
        method: "GET",
        url: "https://www.weatherunion.com/gw/weather/external/v0/get_weather_data",
        params: { latitude: latitude, longitude: longitude },
        headers: { "X-Zomato-Api-Key": process.env.NEXT_PUBLIC_API_KEY },
      }

      try {
        const { data } = await axios.request(options)

        if (data.status == 200) {
          const a = await data.locality_weather_data
          dispatch(changeValue(a))
          router.push(`/search/${n}`)
        } else if (data.status == 400) {
          alert(data.message)
        } else if (data.status == 500) {
          alert(data.message)
        }
      } catch (error) {
        alert("Something went wrong")
      }
    }
  }
  return (
    <div className="flex flex-col justify-center items-center " ref={searchRef}>
      <div
        className={`flex h-10 justify-between items-center px-4  sm:w-[50vw] w-[80vw] ${
          selected
            ? "rounded-t-3xl border-b-0 "
            : "rounded-full hover:shadow-md"
        } border border-[#DFE1E5]  gap-1  z-10`}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-[#5F6368] hover:cursor-pointer"
          onClick={handleSearch}
        ></FontAwesomeIcon>
        <input
          className="border-none outline-none text-[#5F6368]  bg-transparent flex-1 w-[30vw]"
          onChange={handleInput}
          onClick={handleAutoFill}
          value={search}
        ></input>
        {writing && (
          <>
            <FontAwesomeIcon
              icon={faXmark}
              className="text-[#5F6368] hover:cursor-pointer"
              onClick={handleCross}
            />
            <div className="w-[1px] h-[70%] mx-1 bg-[#DFE1E5]"></div>
          </>
        )}
        <FontAwesomeIcon icon={faMicrophone} className="text-[#5F6368]" />
      </div>
      {selected && (
        <div className="border border-t-0 border-[#DFE1E5] sm:w-[50vw] w-[80vw] rounded-b-3xl p-2 shadow-md">
          <div className="bg-white w-full px-2 flex flex-col gap-1 ">
            <div className=" h-[0.5px] bg-[#DFE1E5] text-center"></div>
            {newData &&
              newData?.map((d) => {
                count = count + 1
                if (count < 8)
                  return d?.localityId ? (
                    <div
                      key={d?.localityId}
                      className="hover:cursor-pointer hover:bg-[#DFE1E5]"
                      onClick={(e) => handleAutoSearchLocality(e)}
                      id={d?.localityId}
                    >
                      {d?.localityName} <span>, {d?.cityName}</span>
                    </div>
                  ) : (
                    <></>
                    // <div
                    //   key={
                    //     d?.longitude.toString() + " " + d?.latitude.toString()
                    //   }
                    //   className="hover:cursor-pointer hover:bg-[#DFE1E5]"
                    //   onClick={(e) => handleAutoSearchLocation(e)}
                    //   id={
                    //     d?.longitude.toString() + " " + d?.latitude.toString()
                    //   }
                    // >
                    //   {d?.location?.split(" ")[1]} {d?.location?.split(" ")[0]}
                    // </div>
                  )
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
