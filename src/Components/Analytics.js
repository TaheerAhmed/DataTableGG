import React from 'react'
import DateSelect from './Date'
import Table from './Table'
const Analytics = () => {
    const dummyData = [
        {
            date: "2021-07-07T00:00:00Z",
            app_id: 212211,
            requests: 36249787,
            responses: 36329805,
            impression: 35318801,
            clicks: 328202,
            revenue: 5742.423646628184
        },
        {
            date: "2021-07-06T00:00:00Z",
            app_id: 212112,
            requests: 46249787,
            responses: 46329805,
            impression: 45318801,
            clicks: 428202,
            revenue: 6742.423646628184
        },
        {
            date: "2021-07-05T00:00:00Z",
            app_id: 212113,
            requests: 56249787,
            responses: 56329805,
            impression: 55318801,
            clicks: 528202,
            revenue: 7742.423646628184
        },
        {
            date: "2021-07-05T00:00:00Z",
            app_id: 212113,
            requests: 56249787,
            responses: 56329805,
            impression: 55318801,
            clicks: 528202,
            revenue: 7742.423646628184
        },
        {
            date: "2021-07-05T00:00:00Z",
            app_id: 212113,
            requests: 56249787,
            responses: 56329805,
            impression: 55318801,
            clicks: 528202,
            revenue: 7742.423646628184
        },
        {
            date: "2021-05-05T00:00:00Z",
            app_id: 212213,
            requests: 56249787,
            responses: 56329805,
            impression: 55318801,
            clicks: 528202,
            revenue: 7742.423646628184
        },
        {
            date: "2021-06-05T00:00:00Z",
            app_id: 212213,
            requests: 56249787,
            responses: 56329805,
            impression: 55318801,
            clicks: 528202,
            revenue: 7742.423646628184
        }
    ];


    
  return (
      <div>hello
          <DateSelect />
          <Table data={dummyData} /></div>
  )
}

export default Analytics