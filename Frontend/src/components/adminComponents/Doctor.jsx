import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import DataTables from './DataTables'
import axios from '../../services/axiosInterceptor.js'
import ViewDetails from './ViewDetails.jsx'


function Doctor() {

  const adminToken = localStorage.getItem('adminToken')
  const [doctorData, setDoctorData] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')
  

  const handleView = (row) => {
    const doc = doctorData.filter(doctor => doctor._id === row._id)
    setSelectedDoctor(doc[0])
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    const filtered = doctorData.filter((doc) =>
      doc.name.toLowerCase().startsWith(searchValue)
    );
    setFilteredData(filtered);
  };

  

  const handleBlockUnblock = async (row) => {
    let result;
    if(row.isBlocked === false){
        result = await Swal.fire({
        title: 'Do you want to block the doctor?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      });
    }else{
      result = await Swal.fire({
        title: 'Do you want to unblock the doctor?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
    })
  }
  if(result.isConfirmed){
    try {
      const response = await axios.patch('/admin/manageDoctor',{
        status: row.isBlocked,
        id: row._id
      },{
        headers: {
          Authorization: `Bearer ${adminToken}`,
        }
      })
      if (response.data.message){
        console.log("message is....", response.data.message);
        setDoctorData((prevDoctor) => {
          return prevDoctor.map((doc) => {
            if (doc._id === row._id) {
              return {
                ...doc,
                isBlocked: !doc.isBlocked,
                
              };
            }
            return doc;
          });
        });
        setFilteredData((prevFilteredData) => {
          return prevFilteredData.map((doc) => {
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
      console.error(error)
    }
  }

  }

  const fetchDoctorData = async () => {
    try {
      const response = await axios.get('admin/doctors', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if(response.data){
        console.log("response dat.....",response.data);
        setDoctorData(response.data)
        setFilteredData(response.data)
      }
      
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  }; 


   const columns = [
    {
      name: 'Serial Number',
      selector: (row, index) => index + 1
  },
  {
    name: 'Email',
    selector: (row) => row.email,
  },
    {
      name:'Name',
      selector: (row) => row.name
    },

    {
      name: 'Department',
      selector: (row) => row.dept[0]?.name
    },
    {
      name: 'Status',
      selector: (row) => row.isApproved,
      cell: (row) => (
        <span className={row.isApproved === 'approved' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
          {row.isApproved}
        </span>
      )
    },
    {
      name:'Details',
      cell: (row) => <button className='bg-blue-400 py-2 px-4 rounded' onClick={() => handleView(row)}>View</button>
    },
    {
      name:'Action',
      cell: row => <button className={`border rounded py-2 px-6 font-bold ${row.isBlocked ? 'bg-red-600' : 'bg-green-600'}`} onClick={() => handleBlockUnblock(row)}>{row.isBlocked === false ? "Block" : "Unblock"}</button>
    },
 
   ]

   useEffect(() => {
    fetchDoctorData();
   },[selectedDoctor, adminToken])
  return (
  <>
  {
    selectedDoctor ? <ViewDetails user={selectedDoctor} setSelected={setSelectedDoctor} value={'doctor'} updateData={setDoctorData}/> : (
      <>
      <h2 className="text-4xl font-bold text-center">Doctor Details</h2> <br/>
      <div className="search-area mb-2 ">
        <input
          type="search"
          placeholder="Search doctor name here........"
          className="w-full h-12 px-4 border border-black rounded pr-12 focus:outline-none focus:border-blue-500"
          value={search}
          onChange={handleSearch}
          
        />
        </div><br/><DataTables columns={columns} data={filteredData} />
      </>
    )
  }

  </>
  )
}

export default Doctor
