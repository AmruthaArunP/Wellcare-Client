import React, {useCallback,useEffect, useState } from "react";
import DataTables from "./DataTables";
import { validateCapitalLetter } from "../Validation";
import Swal from 'sweetalert2'
import axios from '../../services/axiosInterceptor.js'

function Department() {

  const [showForm, setShowForm] = useState(false);
  const [newDep, setNewDep] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [createStatus, setStatus] = useState('')
  const [departmentList, setDepartList] = useState([])
  const [search , setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);

  const adminToken = localStorage.getItem('adminToken')

  const departmentData = useCallback(async () => {
    await axios.get( 'admin/departments', {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      }
    }).then(res => {
      setDepartList(res.data)
      setFilteredData(res.data)
    })
  },[adminToken])

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const filtered = departmentList.filter((dep) =>
    dep.name.toLowerCase().startsWith(searchValue)
  );
  setFilteredData(filtered);
  }

  const handleBlockUnblock = async (row) => {
    const result = await Swal.fire({
      title: 'Do you want to block the department?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });

    if(result.isConfirmed){
      console.log('before sending.....',row.isBlocked);
      console.log('department......',row.name);
      try {
        const response = await axios.patch('/admin/manageDepartment',{
          status: row.isBlocked,
          id: row._id
        },{
          headers: {
            Authorization: `Bearer ${adminToken}`,
          }
        })
          if(response.data.error){
            setStatus('Something went wrong')
            setTimeout(() => {
              setStatus('')
            }, 4000)
          }else{
            console.log("status......",response.data);
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

       
          }
        
      } catch (error) {
        console.error(error);
      }
    }
  }
  

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
      name:"Action",
      cell : row => <button 
      className={`border rounded py-2 px-6 font-bold ${row.isBlocked ? 'bg-red-600' : 'bg-green-600'}`} 
      onClick={() => {
        setIsBlocked(!isBlocked);
        console.log("is blocked to ", isBlocked);        
        /*
        setIsBlocked(!isBlocked);
        console.log("is blocked to ", isBlocked);
        */
        handleBlockUnblock(row);
        
      }
      }
    >
      {row.isBlocked === false ? "Block" : "Unblock"}
    </button>
    }
  ];

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleCreateButton = async (event) => {
    event.preventDefault();
    const isValid = validateCapitalLetter(newDep);
    if (isValid) {
    
      const formData = new FormData();
      formData.append('newDep', newDep);
      formData.append('image', selectedImage);
        
      try {
        const response = await axios.post('admin/createDepartment', formData, {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
  
        const responseData = response.data;
        if (responseData.error) {
          setStatus(responseData.error);
          setTimeout(() => {
            setStatus('');
          }, 4000);
        } else {
          setStatus(responseData.message);
          setTimeout(() => {
            setStatus('');
          }, 4000);
          setShowForm(false);
          departmentData();
        }
      } catch (error) {
        console.error('Error:', error);

      }
    } else {
      setStatus('capLetter');
      setTimeout(() => {
        setStatus('');
      }, 4000);
    }
  };
  
  useEffect(() => {
    departmentData();
  }, [departmentData]);
  

  return (
    <>
     
        <div className="flex justify-between flex-wrap">
          <h2 className="text-4xl underline font-bold">Departments</h2>

          <button className="bg-blue-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mt-2" onClick={() => setShowForm(true)}> 
            Create Department
          </button>
        </div><br/>
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
      <div>
      {
  createStatus === "error" ?
    <div className="bg-red-100 border text-xl border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">There was an error! Cannot create department.</span>
    </div>
    : createStatus === "Success" ?
      <div className="bg-green-100  border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Department created successfully.</span>
      </div>
      : createStatus === 'exist' ?
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">Department already exists.</span>
        </div>
        : createStatus === 'capLetter' ?
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">First letter of the department should be capital.</span>
          </div>
          : null
}

      </div>
      {showForm && (
        <form  className="mb-4 border p-4 py- mt-8 max-w-xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-500 text-center">Create New Department</h2><br/>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departmentName">
              Department Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="departmentName"
              type="text"
              name="name"
              value={newDep}
              onChange={(e) => setNewDep(e.target.value)}
              placeholder="Enter department name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departmentImage">
              Department Image
            </label>
            <input
              type="file"
              name="image"
              id="images"
              accept="image/*"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            {selectedImage && (
              <img
                className="m-2"
                width={"100px"}
                src={URL.createObjectURL(selectedImage)}
                alt=""
              />
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              type="submit"
              onClick={handleCreateButton}
            >
              Create
            </button>
            <button
              className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Close
            </button>
          </div>
        </form>
      )}
      {!showForm && <DataTables columns={columns} data={filteredData} title="Departments" />}
    </>
  );
}

export default Department;
