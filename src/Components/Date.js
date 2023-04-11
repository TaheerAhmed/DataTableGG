import React,{useState} from 'react'
import { DateRangePicker,Stack  } from 'rsuite';
import '../styles/Date.css'

const Date = () => {
    const [value, setValue] =useState([]);

    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
    function formatDate(dateString) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const date = new Date(dateString);
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const day = date.getDate();
        const suffix = getOrdinalSuffix(day);
        return `${day}${suffix} ${month} ${year}`;
    }
    console.log(value)
  return (
    <div>
          <DateRangePicker
          onChange={setValue}
          value={value}
          format="MMM do yyyy"
          placeholder="hello"
             />
        
    </div>
  )
}

export default Date