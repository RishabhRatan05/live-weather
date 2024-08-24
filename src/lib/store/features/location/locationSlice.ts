import { createSlice } from "@reduxjs/toolkit"

export interface LocationState {
  humidity: Number
  rain_accumulation: Number
  rain_intensity: Number
  temperature: Number
  wind_direction: Number
  wind_speed: Number
}

export const initialState: LocationState = {
  humidity: 0,
  rain_accumulation: 0,
  rain_intensity: 0,
  temperature: 0,
  wind_direction: 0,
  wind_speed: 0,
}
export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    changeValue: (state, action) => {
      state.humidity = action.payload.humidity
      state.rain_accumulation = action.payload.rain_accumulation
      state.rain_intensity = action.payload.rain_intensity
      state.temperature = action.payload.temperature
      state.wind_direction = action.payload.wind_direction
      state.wind_speed = action.payload.wind_speed
    },
  },
})

export const { changeValue } = locationSlice.actions

export default locationSlice.reducer
