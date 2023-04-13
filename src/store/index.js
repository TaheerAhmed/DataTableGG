import { configureStore } from '@reduxjs/toolkit'
import dateSlice from './Slices/dateSlice'
import settingSlice from './Slices/settingSlice'
import tableSlice from './Slices/tableSlice'
const store = configureStore(
  {
    reducer: { date: dateSlice,setting:settingSlice,table:tableSlice }
  }
)
export default store



