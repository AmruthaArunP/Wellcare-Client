import React, { useEffect, useState } from "react";
import axios from "../services/axiosInterceptor.js";
import DoctorsList from "./DoctorsList";
import Pagination from "./Pagination.jsx";
import { AiOutlineSearch } from "react-icons/ai";

function DoctorsCard() {
  const [docData, setDoctorsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(3);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const fetchDoctors = async () => {
        const response = await axios.get("findDoctors");
        if (response.data) {
          console.log("data is ,......", response.data);
          setDoctorsData(response.data);
        }
      };
      fetchDoctors();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = docData.filter((doctor) =>
      new RegExp(search, "i").test(doctor.name)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
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
        <DoctorsList docData={currentPost} />
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
