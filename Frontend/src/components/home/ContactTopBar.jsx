import React from 'react'

function ContactTopBar() {
  return (
    <>
    <div className='flex-wrap max-w-screen mx-auto '>
        <div className='w-1/2   sm:mx-auto justify-center sm:flex'>
            
            <button className='m-6 border border-black h-16 w-32 sm:w-1/3 rounded text-white bg-black '>
                Emergency<br></br>121-11
            </button>
            <button className='m-6 border border-black h-16 w-32 sm:w-1/3 rounded text-white bg-black'>
                Lifeline<br></br>04567-667778
            </button>
        </div>
               
    </div>
    </>
  )
}

export default ContactTopBar
