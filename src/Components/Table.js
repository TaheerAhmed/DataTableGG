import React, { useState } from 'react'
import '../styles/Table.css'
import Select from 'react-select';
import {useDispatch, useSelector} from 'react-redux'
import { tableActions } from '../store/Slices/tableSlice';
const Table = ({ data }) => {
  const dispatch = useDispatch()
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});
  const [filterSelect, setFilterSelect] = useState(false);
  const [sortingState, setSortingState] = useState(null);
  const tempSliderValues= useSelector(state => state.table.tempSliderValues)

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
          if (String(row[key]).toLowerCase().indexOf(filters[key].toLowerCase()) === -1) {
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
      value = selectedOptionOrEvent.value;
    } else {
      value = null;
    }

    if (value) {
      setFilters({ ...filters, [key]: value });
    } else {
      const newFilters = { ...filters };
      delete newFilters[key];
      setFilters(newFilters);
    }
  };

  const applySliderFilters = (key) => {
    setFilters({ ...filters, [key]: tempSliderValues[key] });
    setFilterSelect(null);
  };

  const resetSlider = (key) => {
    const newTempSliderValues = { ...tempSliderValues };
    delete newTempSliderValues[key];
   dispatch(tableActions.setTempSliderValues(newTempSliderValues));

    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
  };
  const renderFilter = (key) => {
    if (key === 'Date' || key === 'App Name') {
      const uniqueValues = getUniqueValues(key);
      const options = uniqueValues.map((value) => ({ label: value, value }));

      return (
        <Select
          className="filter-select"
          placeholder={`Filter ${key}`}
          options={options}
          isSearchable
          onChange={(selectedOption) => handleFilterChange(selectedOption, key)}
          onBlur={() => setFilterSelect(null)}
        />
      );
    } else {
    const minValue = Math.min(...data.map((row) => row[key]));
    const maxValue = Math.max(...data.map((row) => row[key]));
    return (
      <div className="slider-container">
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
        
        <button className="slider-reset-button" onClick={() => resetSlider(key)}>
          Reset
        </button>
        <button className="slider-apply-button" onClick={() => applySliderFilters(key)}>
          Apply
        </button>
        <span className="close-filter" onClick={closeFilter}>x</span>
      </div>
    );
  }
  };
  const filteredData = filterData(data, filters, filterSelect);
  console.log(tempSliderValues)
  console.log(filteredData)
  const sortedData = sortData(filteredData, sortConfig);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} className="header-content">
                {data[0][key] !== "" ? (
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
              {Object.values(row).map((value, index) => (
                <td key={index} className={`${typeof value === "string" ? "alignLeft" : "alignRight"} tableRows`}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default Table