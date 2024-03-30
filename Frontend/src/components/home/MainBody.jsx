import React from 'react'
import banner from '../../assets/baner1.jpg'
import './Baner.css'
import { AiOutlineSearch } from "react-icons/ai";

function MainBody() {
  return (
    <>
<div className='max-w-screen flex flex-col-reverse sm:flex-row '>
  <div className='text-center py-10 sm:w-1/2'>
    <h1 className='text-5xl text-teal-400'>
      We always provide
      <br />
      <span className='text-teal-400'>best service</span>
      <br />
      <span className='text-slate-300'>Find your doctor Online</span>
    </h1>
    <div className='mt-32'>
      <form className='max-w-screen-md mx-auto p-4 relative'>
        <div className='relative flex items-center'>
          <input
            type='search'
            placeholder='Search Doctor name here........'
            className='w-full h-12 px-4 border-4 border-teal-400 rounded pr-12 focus:outline-none focus:border-blue-500'
          />
          <button className='absolute right-0 top-0 h-full bg-teal-400 text-white rounded p-2'>
            <AiOutlineSearch className='text-xl' />
          </button>
        </div>
      </form>
    </div>
  </div>
  <div className='w-full sm:w-3/4  sm:ml-auto'>
    <img src={banner} className='w-full h-auto' alt='Banner' />
  </div>
</div>
    </>
  )
}

export default MainBody
