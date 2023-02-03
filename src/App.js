import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBRow, 
    MDBCol, 
    MDBContainer,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink
  } from 'mdb-react-ui-kit';

function App() {
  // State
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(4);

  // Sort Options
  const sortOptions = ["name", "adress", "email", "phone", "status"];

  useEffect(() => {
    loadUsersData(0, 4, 0);
  }, []);

  const loadUsersData = async (start, end, increase) => {
    return await axios.get(`http://localhost:3000/users?_start=${start}&_end=${end}`)
          .then((response) => setData(response.data))
          .catch((error) => console.log(error));
  };  

  // Functions
  // HandleReset
  const handleReset = () => {}

  // HandleSearch
  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
        .get(`http://localhost:3000/users?q=${value}`)
        .then((response) => {
          setData(response.data); 
          setValue("");
        })
        .catch((error) => console.log(error))
  }

  // HandleSort
  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios
        .get(`http://localhost:3000/users?_sort=${value}&_order=asc`)
        .then((response) => setData(response.data))
        .catch((error) => console.log(error))
  }

  // HandleFilter
  const handleFilter = async (value) => {
    return await axios
        .get(`http://localhost:3000/users?status=${value}`)
        .then((response) => setData(response.data))
        .catch((error) => console.log(error))
  }

  return (
    <MDBContainer>

      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center"
      }}
      className="d-flex input-group w-auto"
      onSubmit={handleSearch}
      >
        <input 
          type='text'
          className='form-control'
          placeholder='Search Name...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
          <button type='submit' className='btn btn-success'>Search</button>
          <button className='mx-2 btn btn-danger' onClick={() => handleReset}>Reset</button>
      </form>

      <div style={{ marginTop: "100px" }}>
        <h2 className='text-center'>Search, Filter, Sort and Pagination using JSON fake data</h2>
        <MDBRow>
          <MDBCol size='12'>
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope='col'>No.</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Phone</th>
                  <th scope='col'>Adress</th>
                  <th scope='col'>Status</th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className='align-center mb-0'>
                  <tr>
                    <td colSpan={8} className='text-center mb-0'>No Data Found!</td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th>{index +1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.adress}</td>
                      <td>{item.status}</td>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
      <MDBRow>
        <MDBCol size="8">
          <h5>Sort By:</h5>
          <select 
            style={{ width: "50%", borderRadius: "2px", height: "35px" }}
            onChange={handleSort}
            value={sortValue}
          >
            <option>Please select the value</option>
            {sortOptions.map((item, index) => (
              <option value={item} key={index}>{item}</option>
            ))}
          </select>
        </MDBCol>
        <MDBCol size="4">
          <h5>Filter by Status:</h5>
          <button className='btn btn-primary' onClick={() => handleFilter('active')}>Active</button>
          <button className='btn btn-danger mx-2' onClick={() => handleFilter('inactive')}>Inactive</button>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
