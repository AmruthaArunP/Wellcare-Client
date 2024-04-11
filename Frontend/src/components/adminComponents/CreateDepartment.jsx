import React, { useState } from 'react'
import adminAxios from '../../services/adminAxiosInterceptor.js'
import { validateCapitalLetter } from '../Validation';
import { useNavigate } from 'react-router-dom'


function CreateDepartment() {

  const [newDep, setNewDep] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [createStatus, setStatus] = useState('')
  const navigate = useNavigate()


  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleCreateButton = async (event) => {
    event.preventDefault();
    const isValid = validateCapitalLetter(newDep);
    if (isValid) {
    
      const formData = new FormData();
      formData.append('newDep', newDep);
      formData.append('image', selectedImage);
       
      try {
        const response = await adminAxios.post('admin/createDepartment', formData);
  
        const responseData = response.data;
        if (responseData.error) {
          console.log("reached error message");
          setStatus(responseData.error);
        } else {
          setStatus(responseData.message);
          console.log("reached success message");
          console.log("create department response =====> ",responseData.createDep);
          navigate('/department-details')
         
        }
        setTimeout(() => {
          setStatus('');
        }, 4000);

      } catch (error) {
        console.error('Error:', error);

      }
    } else {
      setStatus('capLetter');
      setTimeout(() => {
        setStatus('');
      }, 4000);
    }
  };

  const handleClose = () => {
    navigate('/department-details')
  }


  return (
    <>
          {
  createStatus === "error" ?
    <div className="bg-red-100 border text-xl border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">There was an error! Cannot create department.</span>
    </div>
    : createStatus === "Success" ?
      <div className="bg-green-100  border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Department created successfully.</span>
      </div>
      : createStatus === 'exist' ?
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">Department already exists.</span>
        </div>
        : createStatus === 'capLetter' ?
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">First letter of the department should be capital.</span>
          </div>
          : null
}
            <form  className="mb-4 border p-4 py- mt-8 max-w-xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-500 text-center">Create New Department</h2><br/>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departmentName">
              Department Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="departmentName"
              type="text"
              name="name"
              value={newDep}
              onChange={(e) => setNewDep(e.target.value)}
              placeholder="Enter department name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departmentImage">
              Department Image
            </label>
            <input
              type="file"
              name="image"
              id="images"
              accept="image/*"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            {selectedImage && (
              <img
                className="m-2"
                width={"100px"}
                src={URL.createObjectURL(selectedImage)}
                alt=""
              />
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              type="submit"
              onClick={(e) => handleCreateButton(e)}
            >
              Create
            </button>
            <button
              className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </form>

    </>
  )
}

export default CreateDepartment
