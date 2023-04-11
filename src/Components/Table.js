import React ,{useState}from 'react'
import '../styles/Table.css'
const Table = ({data}) => {
    const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});

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
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>
              {key}
              <button onClick={() => requestSort(key)}>↑</button>
              <input
                type="text"
                placeholder={`Filter ${key}`}
                onChange={(e) => handleFilterChange(e, key)}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

}

export default Table