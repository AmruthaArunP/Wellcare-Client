import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DataTables from './DataTables';
import axios from '../../services/axiosInterceptor.js';
import ViewDetails from './ViewDetails.jsx';

function Patients() {
  const [patientData, setPatientData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const adminToken = localStorage.getItem('adminToken');

  const handleView = (row) => {
    const doc = patientData.filter((patient) => patient._id === row._id);
    setSelectedPatient(doc[0]);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const filtered = patientData.filter((doc) =>
      doc.userName.toLowerCase().startsWith(searchValue)
    );
    setFilteredData(filtered);
  };

  const fetchPatientData = async () => {
    try {
      const response = await axios.get('admin/patients', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setPatientData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const handleBlockUnblock = async (row) => {
    let result;
    if (row.isBlocked === false) {
      result = await Swal.fire({
        title: 'Do you want to block the patient?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      });
    } else {
      result = await Swal.fire({
        title: 'Do you want to unblock the patient?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      });
    }
    if (result.isConfirmed) {
      try {
        const response = await axios.patch(
          '/admin/managePatient',
          {
            status: row.isBlocked,
            id: row._id,
          },
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        if (response.data.message) {
          setPatientData((prevPatient) => {
            return prevPatient.map((doc) => {
              if (doc._id === row._id) {
                return {
                  ...doc,
                  isBlocked: !doc.isBlocked,
                };
              }
              return doc;
            });
          });
          setFilteredData((prevPatient) => {
            return prevPatient.map((doc) => {
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

  useEffect(() => {
    fetchPatientData();
  }, [adminToken]);

  const columns = [
    {
      name: 'Serial Number',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Name',
      selector: (row) => row.userName,
    },
    {
      name: 'Contact',
      selector: (row) => row.contact,
    },
    {
      name: 'Block/Unblock',
      cell: (row) => (
        <button
          className={`border rounded py-2 px-6 font-bold ${
            row.isBlocked ? 'bg-red-600' : 'bg-green-600'
          }`}
          onClick={() => handleBlockUnblock(row)}
        >
          {row.isBlocked == false ? 'Block' : 'Unblock'}
        </button>
      ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <button
          className="bg-blue-400 py-2 px-4 rounded"
          onClick={() => handleView(row)}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <>
      {selectedPatient ? (
        <ViewDetails user={selectedPatient} setSelected={setSelectedPatient} value={'patient'} />
      ) : (
        <>
          <h2 className="text-4xl font-bold text-center">Patient Details</h2>
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
      )}
    </>
  );
}

export default Patients;
