import React, { useCallback, useEffect, useState } from "react";
import axios from "../services/axiosInterceptor.js";
import DoctorsList from "./DoctorsList";
import Pagination from "./Pagination.jsx";
import { AiOutlineSearch } from "react-icons/ai";

function DoctorsCard() {

  const [docData, setDoctorsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [department, setDepartments] = useState([]);
  const [depName, setDepName] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(3);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    console.log("DoctorsCard => line 19 ");
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`findDoctors`);
        console.log("department incoming data ====>", res.data.deps);
        console.log("doctors incoming data ====>", res.data.docs);
        setDoctorsData(res.data.docs);
        setDepartments(res.data.deps);
        console.log("department names ===>", res.data.deps);
      } catch (error) {
        console.error(error);
      }
      console.log("DoctorsCard => line 32 ");

    };

    fetchDoctors();
  }, []);



  const handleSearch = useCallback(async (e) => {
    console.log("DoctorsCard => line 41 ");
    e.preventDefault();
    if (!search) {
      await axios.get(`searchDoc/all`, {
      }).then(res => {
        console.log(res.data);
        setFilteredData(res.data)
      })
    } else {
      if (depName) {
        console.log("DoctorsCard => line 51 ");
        await axios.get(`searchDoc/${search}/${depName}`, {
        }).then(res => {
          console.log('search data response:', res.data);
          setFilteredData(res.data)
        })
      } else {
        console.log("DoctorsCard => line 58 ");
        await axios.get(`searchDoc/${search}`, {
        }).then(res => {
          console.log('search data response:=>', res.data);
          setFilteredData(res.data)
        })
      }

    }
    setIsSearch(true);
  }, [search])



  const handleCategory = (e) => {
    console.log("DoctorsCard => line 73 ");
    const filtered = docData.filter(
      (doc) => doc.doctorData[0].name === e.target.value);
    setFilteredData(filtered);
    setCurrentPage(1);
    setDepName(e.target.value)
    console.log("DoctorsCard => line 79 ");
    setIsSearch(true);
  };

  const handleClear = () => {
    console.log("DoctorsCard => line 84 ");
    setSearch('');
    setFilteredData([]);
    setIsSearch(false);
    setDepName('')
  };



  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = filteredData.length
    ? filteredData.slice(indexOfFirstPost, indexOfLastPost)
    : docData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <button className="absolute right-0 top-0 h-full bg-black text-white rounded p-2">
              <AiOutlineSearch className="text-xl" />
            </button>
          </div>
        </form>
        <div className="col-4 md:col-3 text-center px-12  flex justify-center ">
          <div className="flex p-4 gap-4">
            <div className="text-left mx-auto" style={{ maxWidth: '300px' }}>
              <select
                className="border-b border-gray-300 py-2 px-2 bg-teal-500 rounded font-bold"
                onChange={(e) => handleCategory(e)}
              >
                <option value="">Select Specialities</option>
                {department ? (
                  department.map((dep) => (
                    <option key={dep._id} value={dep.name}>{dep.name}</option>
                  ))
                ) : (
                  <option disabled>No departments available</option>
                )}
              </select>
            </div>
            <div className="border-b border-gray-300 py-2 px-2 bg-gray-200 rounded font-bold ">
              <span onClick={handleClear} className="cursor-pointer text-sm text-green-500 ">Clear</span>
            </div>
          </div>
        </div>

        {/* <DoctorsList docData={docData} /> */}
        {isSearch ? (
          <DoctorsList docData={filteredData} />
        ) : (
          <DoctorsList docData={currentPost} />
        )
        }

        <Pagination
          postPerPage={postPerPage}
          totalPosts={filteredData.length || docData.length}
          paginate={paginate}
        />



      </div>
    </>
  );
}

export default DoctorsCard;
