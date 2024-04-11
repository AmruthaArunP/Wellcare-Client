import React, { useCallback, useEffect, useState } from "react";
import axios from "../services/axiosInterceptor.js";
import DoctorsList from "./DoctorsList";
import Pagination from "./Pagination.jsx";
import { AiOutlineSearch } from "react-icons/ai";

function DoctorsCardNew() {
  const [docData, setDoctorsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [department, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
//   const [postPerPage] = useState(3);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`findDoctors?page=${currentPage}`);
        console.log("department incoming data ====>",res.data.deps);
        console.log("doctors incoming data ====>",res.data.docs);
        setDoctorsData(res.data.docs);
        setDepartments(res.data.deps);
        setTotalPages(Math.ceil(res.data.docs.length /4)); // Assuming 4 doctors per page
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctors();
  }, [currentPage]);




const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    if (!search) {
        await axios.get(`searchDoc/all`, {
        }).then(res => {
            console.log(res.data);
            setFilteredData(res.data)
        })
    } else {
        await axios.get(`searchDoc/${search}`, {
        }).then(res => {
            setFilteredData(res.data)
        })
    }
    setIsSearch(true);
}, [search])

const handleCategory = (e) => {
    const filtered = docData.filter(
        (doc) => doc.doctorData[0].name === e.target.value);
    setFilteredData(filtered);
    setIsSearch(true);
};

const handleClear = () => {
    setSearch('');
    setFilteredData([]);
    setIsSearch(false);
};

const handleClickPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  const handleClickNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  

  return (
    <>
      <div className="">


        <form className="max-w-screen-md mx-auto p-4 relative" onSubmit={handleSearch}>
          <div className="relative flex items-center m-5 ">
            <input
              type="search"
              placeholder="Search Doctor name here........"
              className="w-full h-12 px-4 border border-black rounded pr-12 focus:outline-none focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-0 top-0 h-full bg-black text-white rounded p-2" onClick={handleSearch}>
              <AiOutlineSearch className="text-xl" />
            </button>
          </div>
        </form>
        <div className="col-4 md:col-3 bg-gray-100 p-1 text-center bg-red-100">
  <div className="border border-green-500 mt-5">
    <h3 className="text-lg font-semibold">Departments</h3>
    <h6 onClick={handleClear} className="cursor-pointer text-sm text-green-500">Clear</h6>
    <div className="text-left mx-auto" style={{ maxWidth: '300px' }}>
      <select 
        className="border-b border-gray-300 py-2 px-1"
        onChange={(e) => handleCategory(e)}
      >
        <option value="">Select Department</option>
        {department ? (
          department.map((dep) => (
            <option key={dep._id} value={dep.name}>{dep.name}</option>
          ))
        ) : (
          <option disabled>No departments available</option>
        )}
      </select>
    </div>
  </div>
</div>

        {/* <DoctorsList docData={docData} /> */}
        {isSearch ? (
            <DoctorsList docData={filteredData} />
          ) : (
            <DoctorsList docData={docData} />
          )
        }

        {/* <Pagination
          postPerPage={postPerPage}
          totalPosts={filteredData.length || docData.length}
          paginate={paginate}
        /> */}

<div className="flex justify-center py-5 px-20">
    <button
        className="border shadow-lg border-blue-500 px-4 py-2 rounded-md text-blue-500 mr-2"
        onClick={handleClickPrevious}
        disabled={currentPage === 1}
    >
        Previous
    </button>
    <span className="text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
    <button
        className="border shadow-lg border-blue-500 px-4 py-2 rounded-md text-blue-500 ml-2"
        onClick={handleClickNext}
        disabled={currentPage === totalPages}
    >
        Next
    </button>
</div>

      </div>
    </>
  );
}

export default DoctorsCardNew;
