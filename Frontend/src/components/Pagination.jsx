import React, { useState} from 'react'

function Pagination({postPerPage,totalPosts, paginate}) {

    const pageNumbers = [];
    for(let i = 1; i<= Math.ceil(totalPosts/postPerPage); i++){
        pageNumbers.push(i)
    }

    const [activePage, setActivePage] = useState(1);

    const handlePageClick = (pageNumber) => {
        setActivePage(pageNumber);
        paginate(pageNumber);
    };

  return (
    <>
            <div className="flex justify-center m-4">
            <nav className="inline-flex">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        className={`px-3 py-1 mx-1 rounded-md ${
                            activePage === number
                                ? 'bg-teal-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                        } hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-teal-500 focus:text-white`}
                        onClick={() => handlePageClick(number)}
                    >
                        {number}
                    </button>
                ))}
            </nav>
        </div>
    </>
  )
}

export default Pagination
