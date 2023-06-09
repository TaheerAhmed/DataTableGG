import React, { useState, useEffect } from 'react'
import { DateRangePicker } from 'rsuite';
import '../styles/Date.css'
import {  useDispatch } from 'react-redux'
import { dateActions } from '../store/Slices/dateSlice';
const DateSelect = () => {
  const [value, setValue] = useState([]);
  // date format function
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const dispatch = useDispatch()
// used to set the date in redux store
  useEffect(() => {

    if (value !== null) {
      dispatch(dateActions.setEndDate(String(formatDate(value[1]))))
      dispatch(dateActions.setStartDate(String(formatDate(value[0]))))
    }
    else {
      dispatch(dateActions.setEndDate(""))
      dispatch(dateActions.setStartDate(""))
    }

  }, [value, dispatch])
  return (
      <DateRangePicker
        onChange={setValue}
        value={value}
        format="MMM do yyyy"
        placeholder="Select a time frame"
      />

  )
}

export default DateSelect