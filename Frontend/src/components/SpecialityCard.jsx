import React, { useEffect, useState } from "react";
import SpecialityList from "./SpecialityList";
import { AiOutlineSearch } from "react-icons/ai";
import axios from '../services/axiosInterceptor.js'
import Pagination from './Pagination.jsx'


function SpecialityCard() {

    const [specialityData, setSpecialityData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(3);


    useEffect(() => {
        try {
          const fetchSpeciality = async () => {
            const response = await axios.get("findSpeciality");
            if (response.data) {
              console.log("data is ,......", response.data);
              setSpecialityData(response.data);
            }
          };
          fetchSpeciality();
        } catch (error) {
          console.error(error);
        }
      }, []);

      const handleSearch = (e) => {
        e.preventDefault();
        const filtered = specialityData.filter((speciality) =>
          new RegExp(search, "i").test(speciality.name)
        );
        setFilteredData(filtered);
        setCurrentPage(1);
      };

      const indexOfLastPost = currentPage * postPerPage;
      const indexOfFirstPost = indexOfLastPost - postPerPage;
      const currentPost = filteredData.length
      ? filteredData.slice(indexOfFirstPost, indexOfLastPost)
      : specialityData.slice(indexOfFirstPost, indexOfLastPost);
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
        <SpecialityList specialityData={currentPost} />
        <Pagination
          postPerPage={postPerPage}
          totalPosts={filteredData.length || specialityData.length}
          paginate={paginate}
        />

      </div>
    </>
  )
}

export default SpecialityCard
