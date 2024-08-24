"use client"
import SearchBar from "@/app/components/SearchBar"
import React from "react"
import useLocationData from "../../components/LocationData"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSun,
  faDroplet,
  faSun,
  faTemperature0,
  faTemperatureFull,
  faTemperatureHalf,
  faWind,
} from "@fortawesome/free-solid-svg-icons"

const Search = ({ params }: { params: { locationName: string } }) => {
  const p = params.locationName.replaceAll("%20", " ")
  const n = p.replaceAll("%2C", " ")
  const data = useLocationData()
  const {
    humidity,
    rain_accumulation,
    rain_intensity,
    temperature,
    wind_direction,
    wind_speed,
  } = data
  return (
    <div>
      <div className="sm:flex  items-start gap-2 mb-2 md:ml-[5vw]  mx-[2vw] sm:mt-[2vw] mt-[1vw]">
        <Link
          href={"/"}
          className="font-bold  bg-gradient-to-r from-[#4285F4] from-13% via-[#DB4437] via-40%  to-[#F4B400] inline-block text-transparent bg-clip-text"
        >
          Live
        </Link>
        <SearchBar />
      </div>
      <div className="bg-[#EBEBEB] h-[1px] w-full"></div>
      <div className="flex flex-col justify-center sm:items-start items-center md:ml-[10vw]  mx-[2vw] sm:mt-[2vw] mt-[1vw] ">
        <div className="text-[#1A0DAB] font-bold mb-2">{n}</div>
        <div className="flex flex-wrap w-full">
          <div className="flex flex-wrap gap-2 ">
            <div className="bg-[#DFE1E5] rounded-md flex  justify-evenly items-center gap-2 p-2 sm:w-[33%] w-[90%] h-[15vh]">
              <div className="text-[#5F6368]">Humidity</div>
              <div className="flex flex-col gap-2">
                <FontAwesomeIcon
                  icon={faDroplet}
                  className={` ${
                    humidity == 0
                      ? "text-white"
                      : Number(humidity) < 20
                      ? " text-sky-300"
                      : "text-sky-500"
                  }`}
                />
                <div>{Number(humidity)}</div>
              </div>
            </div>
            <div className="bg-[#DFE1E5] rounded-md flex  justify-evenly items-center gap-2 p-2  sm:w-[33%] w-[47%] h-[15vh]">
              <div className="text-[#5F6368]">Rain</div>
              <div className="flex flex-col gap-2">
                {rain_accumulation == 0 ? (
                  <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
                ) : Number(rain_accumulation) <= 20 ? (
                  <FontAwesomeIcon icon={faCloudSun} className="text-sky-500" />
                ) : (
                  <FontAwesomeIcon
                    icon={faCloudRain}
                    className={`text-sky-500`}
                  />
                )}
                <div>{Number(rain_accumulation)}</div>
              </div>
            </div>
            <div className="bg-[#DFE1E5] rounded-md flex  justify-evenly items-center gap-2 p-2 sm:w-[33%] w-[42%] h-[15vh]">
              <div className="text-[#5F6368]">Rain Intensity</div>
              <div className="flex flex-col gap-2">
                {Number(rain_intensity) == 0 ? (
                  <FontAwesomeIcon
                    icon={faCloudSun}
                    className={`text-sky-500`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCloudShowersHeavy}
                    className={`text-sky-500`}
                  />
                )}
                <div>{Number(rain_intensity)}</div>
              </div>
            </div>
            <div className="bg-[#DFE1E5] rounded-md flex  justify-evenly items-center gap-2 p-2  sm:w-[33%] w-[90%] h-[15vh]">
              <div className="text-[#5F6368]">Temperature</div>
              <div className="flex flex-col gap-2">
                {Number(temperature) < 10 ? (
                  <FontAwesomeIcon
                    icon={faTemperature0}
                    className={`text-sky-500`}
                  />
                ) : Number(temperature) < 30 ? (
                  <FontAwesomeIcon
                    icon={faTemperatureHalf}
                    className={`text-yellow-500`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTemperatureFull}
                    className={`text-orange-500`}
                  />
                )}
                <div>{Number(temperature)}</div>
              </div>
            </div>
            <div className="bg-[#DFE1E5] rounded-md flex  justify-evenly items-center gap-2 p-2  sm:w-[33%] w-[47%] h-[15vh]">
              <div className="text-[#5F6368]">Wind</div>
              <div className="flex flex-col gap-2">
                {Number(wind_direction) <= 45 ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : Number(wind_direction) <= 135 ? (
                  <FontAwesomeIcon icon={faArrowRight} />
                ) : Number(wind_direction) <= 225 ? (
                  <FontAwesomeIcon icon={faArrowDown} />
                ) : Number(wind_direction) <= 315 ? (
                  <FontAwesomeIcon icon={faArrowLeft} />
                ) : (
                  <FontAwesomeIcon icon={faArrowUp} />
                )}
                <div>{Number(wind_direction)}</div>
              </div>
            </div>
            <div className="bg-[#DFE1E5] rounded-md flex  justify-evenly items-center gap-2 p-2  sm:w-[33%] w-[42%] h-[15vh]">
              <div className="text-[#5F6368]">Wind</div>
              <div className="flex flex-col gap-2">
                <FontAwesomeIcon icon={faWind} className={`text-sky-500`} />
                <div>{Number(wind_speed)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
