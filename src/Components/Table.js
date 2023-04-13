import React, { useState } from 'react'
import { logo } from '../assets/logos/filtericon.png';
import '../styles/Table.css'
const Table = ({ data }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});
  const [filterSelect, setFilterSelect] = useState(false);
  const [sortingState, setSortingState] = useState(null);

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

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setSortingState(key);
  };

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const filterData = (data, filters) => {
    // console.log(filters)
    return data.filter((row) => {
      for (const key in filters) {

        if (String(row[key]).toLowerCase().indexOf(filters[key].toLowerCase()) === -1) {
          return false;
        }
      }
      return true;
    });
  };

  const filteredData = filterData(data, filters);
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
                    <div>
                      {filterSelect === key ? (
                        <input
                          type="text"
                          placeholder={`Filter ${key}`}
                          onChange={(e) => handleFilterChange(e, key)}
                          onBlur={() => setFilterSelect(null)}
                        />
                      ) : (
                        <div className="image-container">
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
                    <div className="header-text">{key}</div>
                    <div>
                      <div className='image-container'>
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