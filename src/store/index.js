import { configureStore } from '@reduxjs/toolkit'
import dateSlice from './Slices/dateSlice'

const store = configureStore(
  {
    reducer: { date: dateSlice }
  }
)
export default store



