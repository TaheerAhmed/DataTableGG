import React, { useEffect, useState } from 'react'
import DateSelect from './Date'
import Table from './Table'
import { useSelector } from 'react-redux'
import Settings from './Settings'
import axios from 'axios'
import ErrorModal from './ErrorModal'
import '../styles/Analytics.css'
import { useDispatch } from 'react-redux'
import { settingActions } from '../store/Slices/settingSlice'
const Analytics = () => {
    const dispatch = useDispatch()
    const startDate = useSelector(state => state.date.startDate)
    const endDate = useSelector(state => state.date.endDate)
    const columnFormat = useSelector(state => state.setting.boxes)
    const settingsVisible = useSelector(state => state.setting.showSettingModal)

    const [data, setdata] = useState([])
    const [formattedData, setFormattedData] = useState(data)

    //dat formatter
    function formatDate(dateString) {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        const suffixes = ["st", "nd", "rd", "th"];
        let suffix = suffixes[3];
        if (day === 1 || day === 21 || day === 31) {
            suffix = suffixes[0];
        } else if (day === 2 || day === 22) {
            suffix = suffixes[1];
        } else if (day === 3 || day === 23) {
            suffix = suffixes[2];
        }

        return `${day}${suffix} ${months[monthIndex]} ${year}`;
    }
    useEffect(() => {
        const fetchData = async () => {
            if (startDate !== "" && endDate !== "") {
                axios.get(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`)
                    .then(res => {
                        console.log(res.data.data)
                        setdata(res.data.data)
                    })
            }
        }
        try {
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [startDate, endDate])


    useEffect(() => {
        function formatData(dummyData, dataLayer) {
            return dummyData.map(item => {
                const itemData = {};

                dataLayer.forEach(dataLayerItem => {
                    if (dataLayerItem.available) {
                        switch (dataLayerItem.id) {
                            case 'Date':
                                itemData[dataLayerItem.service_name] = formatDate(item.date);
                                break;
                            case 'App Name':
                                itemData[dataLayerItem.service_name] = item.app_id;
                                break;
                            case 'AD Request':
                                itemData[dataLayerItem.service_name] = item.requests;
                                break;
                            case 'AD Response':
                                itemData[dataLayerItem.service_name] = item.responses;
                                break;
                            case 'Impression':
                                itemData[dataLayerItem.service_name] = item.impressions;
                                break;
                            case 'Clicks':
                                itemData[dataLayerItem.service_name] = item.clicks;
                                break;
                            case 'Revenue':
                                itemData[dataLayerItem.service_name] = Number((item.revenue).toFixed(2));
                                break;
                            case 'Fill Rate':
                                itemData[dataLayerItem.service_name] = Number((
                                    (item.responses / item.requests) *
                                    100
                                ).toFixed(2));
                                break;
                            case 'CTR':
                                itemData[dataLayerItem.service_name] =
                                    Number(((item.clicks / item.impressions) * 100).toFixed(2));

                                break;
                            default:
                                break;
                        }
                    } else {
                        itemData[dataLayerItem.service_name] = "";
                    }
                });

                const nonEmptyFields = {};
                const emptyFields = {};

                Object.keys(itemData).forEach(key => {
                    if (itemData[key] === "") {
                        emptyFields[key] = itemData[key];
                    } else {
                        nonEmptyFields[key] = itemData[key];
                    }
                });

                return { ...nonEmptyFields, ...emptyFields };
            });
        }

        setFormattedData(formatData(data, columnFormat))
    },
        [columnFormat, data])
    console.log(formattedData)
    const tableValidation = (startDate !== "" && startDate !== null && startDate !== undefined) && (endDate !== "" && endDate !== undefined && endDate != null) && formattedData.length > 0
    return (
        <div className='analytics-home'>
            <div className='title-analytics'>Analytics</div>
            <div className="analytics-buttons">
                <DateSelect />
                <div onClick={() => {
                    dispatch(settingActions.setSettingModal(!settingsVisible));
                }}
                    className='settin'
                >
                    Settings</div>
            </div>
            <Settings />

            <div className='table-box'>
                {tableValidation ? <Table data={formattedData} /> : <ErrorModal />}


            </div>

        </div>
    )
}

export default Analytics