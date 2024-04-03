import React , {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/hooks/useAuth";

function TopAdminNavbar() {

  const navigate = useNavigate()
  const {admin , setAdmin } = useAuth()

  useEffect(()=>{
    const adminToken= localStorage.getItem('adminToken')
    if(!adminToken){
      navigate('/admin-login')
    }
  })

  const handleSignout = ()=>{
    localStorage.removeItem("adminToken");
    setAdmin(false)
    navigate("/admin-login",{ replace: true });
  }
  
  
  return (
    <>
<nav className="bg-blue-300 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">

          <div className="mx-4 my-6 text-3xl flex-col items-center text-black justify-between ">
            <div className="flex items-center"> 
              <p className="hover:text-black font-bold cursor-pointer font-Poppins mr-2">
                WELL CARE - 
              </p>
              <p className="text-2xl font-bold text-white  ">Admin</p>
            </div>
          </div>

          <div>
            <button onClick={handleSignout } className="text-lg text-white font-bold px-6 py-2 rounded-lg bg-black hover:bg-blue-600">
              SIGNOUT
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default TopAdminNavbar;
