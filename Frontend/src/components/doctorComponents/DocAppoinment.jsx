import React, { useEffect,useState } from 'react'
import doctorAxios from '../../services/doctorAxiosInterceptor.js'
import DataTables from '../adminComponents/DataTables.jsx';

function DocAppoinment() {

  const doctorToken = localStorage.getItem('doctorToken');
  const [search, setSearch] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase()
    setSearch(searchValue)
    const filtered = appointments.filter((appointment) =>
    appointment.userData[0].userName.toLowerCase().startsWith(searchValue)
  );
  setFilteredData(filtered)
  }

  const columns = [
    {
      name: 'Date',
      selector: (row) => row.time,
      sortable: true
    },
    {
      name: 'Time',
      selector: (row) => row.time,
      sortable: true
    },
    {
      name: 'Patient',
      selector: (row) => row.userData[0].userName
    },
    {
      name: 'Address',
      selector: (row) => row.userData[0].address
    },
    {
      name: 'Phone',
      selector: (row) => row.userData[0].contact
    },
    {
      name: 'Status',
      selector: (row) => (
        <div>
          {row.isAttended ? 'Attended' : new Date(row.createdAt) < new Date() ? 'Unavailable' : 'Pending'}
        </div>
      )
    }
  ];

  useEffect(() => {
    const fetchAppoinment =  async () => {
      const response =  await doctorAxios.get("doctor/doctorAppoinments") 
      if(response.data){
        console.log('appoinmnet:',response.data);
        setAppointments(response.data)
        setFilteredData(response.data)
      }
    }
    fetchAppoinment();
  },[doctorToken])

  return (
    <div className=''>
      <h2 className="text-center text-3xl md:text-4xl text-teal-600 font-bold mb-4  ">Appoinments</h2>
      <br />
          <div className="search-area mb-2 ">
            <input
              type="search"
              placeholder="Search Department name here........"
              className="w-full h-12 px-4 border border-black rounded pr-12 focus:outline-none focus:border-teal-500 "
        value={search}
        onChange={handleSearch}
            />
          </div>
          <br />
          <DataTables columns={columns} title="Appointments" data={filteredData} />
    </div>
  )
}

export default DocAppoinment
