import React, { useCallback, useEffect, useState }  from 'react'
import DataTables from '../../components/adminComponents/DataTables'; 
import doctorAxios from '../../services/doctorAxiosInterceptor.js'


function DocPatient() {

  const [patientsData, setPatientsData] = useState()
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const doctorToken = localStorage.getItem('doctorToken')

  const prescriptionData = useCallback(async () => {
    await doctorAxios.get( 'doctor/patients').then(res => {
        console.log("comming patient data:",res.data);
        setPatientsData(res.data)
        setFilteredData(res.data)
    })
}, [])  

const columns = [

  {
      name: 'Patient Name',
      selector: (row) => row.userData[0].userName
  },
  {
      name: 'Contact',
      selector: (row) => row.userData[0].contact
  },
  {
      name: 'Email',
      selector: (row) => row.userData[0].email
  },
  {
      name: 'Age',
      selector: (row) => row.userData[0].age
  },
  {
      name: 'Gender',
      selector: (row) => row.userData[0].gender
  }
]

const handleSearch = (e) => {
  const searchValue = e.target.value.toLowerCase();
  setSearch(searchValue);

  const filtered = patientsData.filter((patient) =>
      patient.userData[0].userName.toLowerCase().startsWith(searchValue)
  );
  setFilteredData(filtered);
};

useEffect(() => {
  prescriptionData()
}, [prescriptionData])


  return (
 
      <>
          <h2 className="text-center text-4xl text-teal-600 font-bold mb-4 underline">Patient Details</h2>
          <br />
          <div className="search-area mb-2 ">
            <input
              type="search"
              placeholder="Search patient name here........"
              className="w-full h-12 px-4 border border-black rounded pr-12 focus:outline-none focus:border-blue-500"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <br />
          <DataTables columns={columns} data={filteredData} />
        </>
   
  )
}

export default DocPatient
