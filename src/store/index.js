import { configureStore } from '@reduxjs/toolkit'
import dateSlice from './Slices/dateSlice'
import settingSlice from './Slices/settingSlice'
const store = configureStore(
  {
    reducer: { date: dateSlice,setting:settingSlice }
  }
)
export default store



