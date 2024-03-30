import React, { useState } from 'react'
import axios from '../../services/axiosInterceptor.js'
import { AiOutlineSearch } from "react-icons/ai";

function Search() {

  const [search, setSearch] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get()
    console.log('search value:',search); 
  };

  return (
    <>
    <form className="max-w-screen-md mx-auto p-4 relative"  >
      <div className="relative flex items-center m-5 ">
        <input
          type="search"
          placeholder="Search Doctor name here........"
          className="w-full h-12 px-4 border border-black rounded pr-12 focus:outline-none focus:border-blue-500"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
        <button className="absolute right-0 top-0 h-full bg-black text-white rounded p-2">
          <AiOutlineSearch className="text-xl" />
        </button>
      </div>
    </form>

    </>

  )
}

export default Search
