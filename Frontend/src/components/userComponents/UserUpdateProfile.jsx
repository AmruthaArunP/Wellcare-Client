import React, {useState} from 'react'
import axios from '../../services/axiosInterceptor.js'
import { useDispatch, useSelector } from 'react-redux';
import { setUserdata } from '../../redux/userData';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


function UserUpdateProfile() {

    const userData = useSelector(state => state.user.data)
    console.log("userDtata in updatesd profile:",userData);
    const dispatch = useDispatch()
    const navigate =useNavigate()

    const [name, setName] = useState(userData.userName);
    const [age, setAge] = useState(userData.age);
    const [contact, setContact] = useState(userData.contact);
    const [gender, setGender] = useState(userData.gender);
    const [address, setAddress] = useState(userData.address);
    const [documents, setDocuments] = useState(userData.documents);
    const [profile, setProfile] = useState(userData.image);
    const [preview, setPreview] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [msg, setMsg] = useState("");
    const [docChange, setDocChange] = useState(false);
    const [prChange, setProfileChange] = useState(false);
    const userToken = localStorage.getItem("userToken");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(" name is:",name);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("contact", contact);
        formData.append("gender", gender);
        formData.append("address", address);
        formData.append("images", profile);
        formData.append("prChange", prChange);

        if(documents && documents.length>0){
          for(let i=0; i < documents.length; i++){
            formData.append("documents", documents[i]);
          }
        }
    
        if (docChange) {
          for (let i = 0; i < selectedImages.length; i++) {
            formData.append("images", selectedImages[i]);
          }
        }
    
        if (
          !name ||
          !age ||
          !gender ||
          !contact ||
          !address
          
        ) {
          setMsg("Please fill all the required fields...!");
          return;
        }
    
        try {
          const response = await axios.post("updateProfile", formData);
          if (response.data === 'blocked') {
            navigate('/login');
            localStorage.removeItem('userToken');

          }else{
            dispatch(setUserdata(response.data.updatedUser))
            console.log("message....",response.data.message);
            await Swal.fire({
              title: 'Success!',
              text: response.data.message,
              icon: 'success',
              confirmButtonText: 'OK',          
            });
            navigate('/user-home-page')
          }
        } catch (error) {
          console.log(error);
        }
      };


    const handleDocumentChange = (e) => {
        const images = Array.from(e.target.files);
        setDocChange(true);
        setSelectedImages((prevDocuments) => [...prevDocuments, ...images]);
      };

      const deleteImage = async (doc) => {
        try {
          if (userData.documents.includes(doc)) {
            const response = await axios.delete(`deleteDocument/${doc}`);
            if(response.data){
              console.log("coming delete data after delete:;;;;", response.data);
              setDocuments((prevDocuments) =>
              prevDocuments.filter((item) => item !== doc)
            );
            console.log('after deleting:  ',documents );  

            }
            
          } else {
            setSelectedImages((prevDocuments) =>
            prevDocuments.filter((item) => item !== doc)
          );
          }
        } catch (error) {
          console.error("Error deleting document:", error);
        }
      };



  return (
<>
<div className="container bg-teal-200 mx-auto px-12 py-8 w-3/4">
      <p className="text-center text-black underline text-3xl font-bold m-4">
        UPDATE USER PROFILE
      </p>
      <br />
      {msg && <div className="text-red-500 mb-4">{msg}</div>}
      <div className="flex flex-wrap  ">
        <div className=" w-full md:w-1/2 p-4 ">
          <h2 className=" underline text-black text-2xl font-bold mb-2">
            Profile Details
          </h2>
          <div className="mb-4">
            <label className="text-lg ">Profile Photo:</label>
            <br />

            {preview ? (
              <img src={preview} alt="" className="w-32 h-32" />
            ) : profile ? (
              <img
                src={`http://localhost:8000/images/${profile}`}
                alt="Profile"
                className="w-32 h-32"
              />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                alt="Profile"
                className="w-32 h-32"
              />
            )}

            <input
              type="file"
              id="images"
              accept="image/*"
              className="w-full px-4 py-2 mt-2 border border-black rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => {
                setProfile(e.target.files[0]);
                setProfileChange(true);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <br />
          </div>
          <div className="mb-4">
            <label className="text-lg ">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="text-lg ">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="text-lg ">Contact:</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>



        </div>
        <div className="w-full md:w-1/2 p-4">
        <div className="mb-4">
            <label className="text-lg ">Gender:</label>
            <br />
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="male" className="text-md font-bold p-2">
              Male
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female" className="text-md font-bold p-2">
              Female
            </label>
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              checked={gender === "other"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="other" className="text-md font-bold p-2">
              Other
            </label>
          </div>
        <div className="mb-4">
            <label className="text-lg">Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <p className="text-xl font-bold text-white border-2 p-2 bg-teal-400">
              Please upload your medical report  !!!!!
            </p>
            <label className="text-lg ">Documents:</label>

            <input
              type="file"
              id="images"
              accept="image/*"
              className="w-full px-4 py-2 mt-2 border border-black rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleDocumentChange}
              multiple
            />

            <div className="overflow-x-auto border border-gray-300 rounded-md p-2">
              <div className="flex flex-wrap">
                {documents && documents.length > 0
                  ? documents.map((doc, index) => (
                      <div key={index} className="flex flex-col">
                        <img
                          className="w-32 h-32"
                          src={`http://localhost:8000/images/${doc}`}
                          alt=""
                        />
                        <button
                          className="me-2 mt-1 bg-transparent border border-green-500 text-green-500 font-semibold py-1 px-2 rounded text-xs"
                          value={doc}
                          onClick={() => deleteImage(doc)}
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  : null}
                {selectedImages && selectedImages.length > 0
                  ? selectedImages.map((doc, index) => (
                      <div key={index} className="flex flex-col">
                        <img
                          className="w-32 h-32"
                          src={URL.createObjectURL(doc)}
                          alt=""
                        />
                        <button
                          className="me-2 mt-1 bg-transparent border border-green-500 text-green-500 font-semibold py-1 px-2 rounded text-xs"
                          onClick={() => deleteImage(doc)}
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  : null}
                {(documents === null || documents.length === 0) &&
                (selectedImages === null || selectedImages.length === 0) ? (
                  <p className="text-red-500">Ooopsie..! No data found.</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-xl bg-teal-500 text-white hover:bg-black text-white font-bold py-2 px-4 rounded mt-4 mx-auto "
        onClick={handleSubmit}
      >
        Update Profile
      </button>
    </div>
</>
  )
}

export default UserUpdateProfile
