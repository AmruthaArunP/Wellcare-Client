import React from 'react'

function Contact() {
  return (
    <>
     <div className="bg-gray-100  border p-4 ">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 bg-gray-200 m-6 rounded ">
        <div className="max-w-xl ">
          <h2 className="text-3xl font-extrabold  sm:text-4xl text-teal-500">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-500">
            We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <p className="mt-4 text-lg text-teal-500 font-bold ">
            You can reach out to our customer care at <button className="font-medium bg-teal-500 text-white p-4 rounded  ">1-800-123-4567</button>
          </p>
        </div>

      </div>
    </div>
    </>


  )
}

export default Contact
