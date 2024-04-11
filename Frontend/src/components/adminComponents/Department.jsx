import React, { useEffect, useState } from "react";
import DataTables from "./DataTables";
import Swal from 'sweetalert2'
import adminAxios from '../../services/adminAxiosInterceptor'
import { useNavigate } from 'react-router-dom'


function Department() {

  const [departmentList, setDepartList] = useState([])
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate()

  const adminToken = localStorage.getItem('adminToken')


  const handleCreate = () => {
    navigate('/create-department')
  }

  const departmentData = async () => {
    try {
      await adminAxios.get('admin/departments').then(res => {
        setDepartList(res.data)
        setFilteredData(res.data)
      })
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const filtered = departmentList.filter((dep) =>
      dep.name.toLowerCase().startsWith(searchValue)
    );
    setFilteredData(filtered);
  }


  const handleBlockUnblock = async (row) => {
    let result;
    if (row.isBlocked === false) {
      result = await Swal.fire({
        title: 'Do you want to block the department?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      });
    } else {
      result = await Swal.fire({
        title: 'Do you want to unblock the department?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      });
    }
    if (result.isConfirmed) {
      try {
        const response = await adminAxios.patch('/admin/manageDepartment', {
          status: row.isBlocked,
          id: row._id
        })

        if (response.data) {
          console.log("status......", response.data);
          setDepartList((prevDepartments) => {
            return prevDepartments.map((department) => {
              if (department._id === row._id) {
                return {
                  ...department,
                  isBlocked: !department.isBlocked,

                };
              }
              return department;
            });
          });
          setFilteredData((prevDepartments) => {
            return prevDepartments.map((doc) => {
              if (doc._id === row._id) {
                return {
                  ...doc,
                  isBlocked: !doc.isBlocked,
                };
              }
              return doc;
            });
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };



  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Created at",
      selector: (row) => row.timeStamp,
    },
    {
      name: "Image",
      selector: (row) => (
        <img className="m-2 ms-0" width={"100px"} src={row.image} alt="" />
      ),
    },
    {
      name: 'Block/Unblock',
      cell: (row) => (
        <button
          className={`border rounded py-2 px-6 font-bold ${row.isBlocked ? 'bg-red-600' : 'bg-green-600'
            }`}
          onClick={() => handleBlockUnblock(row)}
        >
          {row.isBlocked === false ? 'Block' : 'Unblock'}
        </button>
      ),
    },
  ];



  useEffect(() => {
    departmentData();
  }, [adminToken]);


  return (
    <>

      <div className="flex justify-between flex-wrap">
        <h2 className="text-4xl underline font-bold">Departments</h2>

        <button className="bg-blue-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mt-2" onClick={handleCreate}>
          Create Department
        </button>
      </div><br />
      <div className="search-area mb-2 ">
        <input
          type="search"
          placeholder="Search Department name here........"
          className="w-full h-12 px-4 border border-black rounded pr-12 focus:outline-none focus:border-blue-500"
          value={search}
          onChange={handleSearch}
        />
      </div>



      <br />
      {<DataTables columns={columns} data={filteredData} title="Departments" />}
    </>
  );
}

export default Department;
