import React, { useState } from 'react'
import '../styles/Table.css'
import Select from 'react-select';
import {useDispatch, useSelector} from 'react-redux'
import { tableActions } from '../store/Slices/tableSlice';
const Table = ({ data }) => {
  const dispatch = useDispatch()
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filterSelect, setFilterSelect] = useState(false);
  const [appNameSelectedOptions, setAppNameSelectedOptions] = useState([]);
  const [dateSelectedOptions, setDateSelectedOptions] = useState([]);
  const [sortingState, setSortingState] = useState(null);
  const tempSliderValues= useSelector(state => state.table.tempSliderValues)
  const filters=useSelector(state => state.table.filters)

// sort function for the table
  const sortData = (data, config) => {
    if (!config) return data;

    return data.sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === "ascending" ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };
  // function to handle the sorting of the table
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setSortingState(key);
  };

// function to handle the filtering of the table
  const filterData = (data, filters) => {
    return data.filter((row) => {
      for (const key in filters) {
        if (key === 'Date' || key === 'App Name') {
          const filterValues = filters[key].split('|');
          console.log(filterValues)
          if (!filterValues.some((value) => String(row[key]).toLowerCase().includes(value.toLowerCase()))) {
            return false;
          }
        } else {
          if (parseFloat(row[key]) < parseFloat(filters[key])) {
            return false;
          }
        }
      }
      return true;
    });
  };
  const getUniqueValues = (key) => {
    const uniqueValues = new Set();
    data.forEach((row) => uniqueValues.add(row[key]));
    return Array.from(uniqueValues);
  };
  const closeFilter = () => {
    setFilterSelect(null);
  };
  const handleFilterChange = (selectedOptionOrEvent, key) => {
    let value;
    if (selectedOptionOrEvent && selectedOptionOrEvent.target) {
      value = selectedOptionOrEvent.target.value;
      dispatch(tableActions.setTempSliderValues({ ...tempSliderValues, [key]: value }));
      return;
    } else if (selectedOptionOrEvent) {
      if(selectedOptionOrEvent.length>0){
        value = selectedOptionOrEvent.map((option) => option.value).join('|');
      }
      else{
        value = selectedOptionOrEvent.value;
      }
    } else {
      value = null;
    }

    if (value) {
      dispatch(tableActions.setFilters({ ...filters, [key]: value }))
    } else {
      const newFilters = { ...filters };
      delete newFilters[key];
      dispatch(tableActions.setFilters(newFilters))
    }
  };

  const applySliderFilters = (key) => {
    dispatch(tableActions.setFilters({ ...filters, [key]: tempSliderValues[key] }));
    setFilterSelect(null);
  };

  const resetSlider = (key) => {
    const newTempSliderValues = { ...tempSliderValues };
    delete newTempSliderValues[key];
   dispatch(tableActions.setTempSliderValues(newTempSliderValues));

    const newFilters = { ...filters };
    delete newFilters[key];
    dispatch(tableActions.setFilters(newFilters))
  };
  const renderFilter = (key) => {
    if (key === 'Date' || key === 'App Name') {
      const uniqueValues = getUniqueValues(key);
      const options = uniqueValues.map((value) => ({ label: value, value }));

      const handleApply = () => {
        if (key === 'App Name') {
          handleFilterChange(appNameSelectedOptions, key);
          setAppNameSelectedOptions([]);
        } else if (key === 'Date') {
          handleFilterChange(dateSelectedOptions, key);
          setDateSelectedOptions([]);
        }
        setFilterSelect(null);
      };

      const handleCancel = () => {
        if (key === 'App Name') {
          setAppNameSelectedOptions([]);
        } else if (key === 'Date') {
          setDateSelectedOptions([]);
        }
        setFilterSelect(null);
      };

      return (
        <div className='filter-container'>
          <Select
            className="filter-select"
            placeholder={`Filter ${key}`}
            options={options}
            isMulti
            isSearchable
            value={key === 'App Name' ? appNameSelectedOptions : dateSelectedOptions}
            onChange={key === 'App Name' ? setAppNameSelectedOptions : setDateSelectedOptions}
          />
          <div className='buttons-filter'>
            <button onClick={handleApply} className='slider-apply-button'>Apply</button>
            <button onClick={handleCancel} className='slider-reset-button'>Cancel</button>
          </div>
          <span className="close-filter-search" onClick={closeFilter}>
            x
          </span>
        </div>
      );
    } else {
    const minValue = Math.min(...data.map((row) => row[key]));
    const maxValue = Math.max(...data.map((row) => row[key]));
    return (
      <div className="slider-container">
        <p>
          {key}
        </p>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={tempSliderValues[key] || minValue}
          onChange={(e) => handleFilterChange(e, key)}
        />
        <div className='min-max'>
         
          <span className="slider-min-label">Min:{minValue}</span> 
          <span className="slider-max-label">Max:{maxValue}</span>
        </div>
        
        
        <div className='buttons-filter'><button className="slider-reset-button" onClick={() => resetSlider(key)}>
          Reset
        </button>
          <button className="slider-apply-button" onClick={() => applySliderFilters(key)}>
            Apply
          </button></div>
        <span className="close-filter" onClick={closeFilter}>x</span>
      </div>
    );
  }
  };
  // to create the unique dates and app names for the header and also the avg of other fields in the header 
  function totalHeaderData(arr) {
    const uniqueDates = new Set();
    const uniqueAppNames = new Set();
    let totalCTR = 0;
    let totalClicks = 0;
    let totalFillRate = 0;
    let totalImpression = 0;
    let totalRevenue = 0;
    let totalADReqs=0
    let totalAdRes=0

    for (const item of arr) {
      uniqueDates.add(item.Date);
      uniqueAppNames.add(item["App Name"]);
      totalCTR += item.CTR;
      totalClicks += item.Clicks || 0;
      totalFillRate += item["Fill Rate"] || 0;
      totalImpression += item.Impressions || 0;
      totalRevenue += parseFloat(item.Revenue || 0);
      totalADReqs+=item["Requests"]
      totalAdRes+=item["Responses"]
    }

    return {
      "Requests": String((totalADReqs / 1000000).toFixed(2))+"M",
      "Responses": String((totalAdRes / 1000000).toFixed(2))+"M",
      "App Name": uniqueAppNames.size,
      CTR: String((totalCTR / arr.length).toFixed(2))+"%",
      Clicks: String((totalClicks / 1000000).toFixed(2))+"M",
      Date: uniqueDates.size,
      "Fill Rate":String(( totalFillRate / arr.length).toFixed(3))+"%",
      Impressions:String( (totalImpression / 1000000).toFixed(2))+"M",
      Revenue:"$"+String((totalRevenue).toFixed(2)),
    };
  }
  const filteredData = filterData(data, filters, filterSelect);
  const sortedData = sortData(filteredData, sortConfig);
  const formattedHeaderData = totalHeaderData(sortedData);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {Object.keys(sortedData[0]).map((key) => (
              <th key={key} className="header-content">
                {sortedData[0][key] !== "" ? (
                  <>
                    <div >
                      {filterSelect === key ? (
                        renderFilter(key)
                      ) : (
                          <div className={`
                          image-container
                         ${(key === "Date") || (key === "App Name") ? " alignLeft" :"alignRight" } `}>
                          <img
                            src={require("../assets/logos/filtericon.png")}
                            width={"25px"}
                            height={"25px"}
                            className="filterIcon"
                            alt="filter"
                            onClick={() => setFilterSelect(key)}
                          />
                        </div>
                      )}
                    </div>
                    <div className={`${(key === "Date") || (key==="App Name")? "alignLeft" : "alignRight"} image-container`}>{key}</div>
                    <div>
                      <div className={`${(key === "Date") || (key === "App Name") ? "alignLeft" : "alignRight"} image-container`}>
                        {
                          sortingState === key ? (
                            sortConfig.direction === "ascending" ? (
                              <img
                                src={require("../assets/logos/down-arrow.png")}
                                width={"15px"}
                                onClick={() => requestSort(key)}
                                height={"15px"}
                                alt="down arrow"
                              />
                            ) : (
                              <img
                                src={require("../assets/logos/up-arrow.png")}
                                width={"15px"}
                                onClick={() => requestSort(key)}
                                height={"15px"}
                                alt="up arrow"
                              />
                            )
                          ) : (
                            <img
                              src={require("../assets/logos/up-arrow.png")}
                              width={"15px"}
                              onClick={() => requestSort(key)}
                              height={"15px"}
                              alt="up arrow" />
                          )
                        }
                      </div>

                    </div>
                    {/* Unique date and app ames and avg of other field */}
                    <div className={`${(key === "Date") || (key === "App Name") ? "alignLeft" : "alignRight"}  headerData`}>
                      {formattedHeaderData[key]}</div>
                  </>
                ) : (
                  ""
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              {Object.entries(row).map(([key, value], index) => (
                <td
                  key={index}
                  className={`${typeof value === "string" ? "alignLeft" : "alignRight"} tableRows`}
                >
                  {value===""?""
                  :key === "Revenue"
                    ? "$" + value
                    : (key === "CTR" || key === "Fill_Rate")
                      ? value + "%"
                      : key === "App Name"
                        ? <>
                          <img src={require('../assets/logos/moj.png')} alt="App_Logo" style={{ marginLeft: '5px' }} className='App_Logo' />
                          {value}
                          
                        </>
                        : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default Table