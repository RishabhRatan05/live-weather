"use client"
import { useAppSelector } from "@/lib/store/hooks"

const useLocationData = () => {
  const newData = useAppSelector((state) => state.location)
  return newData
}

export default useLocationData
