import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { TiTick } from "react-icons/ti";


function Feedback() {

  const navigate = useNavigate()

  const handleHome = useCallback(() => {
    navigate('/')
  }, [navigate])
  
  return (
    
      <>
      <div className="flex justify-center items-center max-w-screen-md mx-auto bg-teal-100 m-12">
      <div className="text-center w-full h-48 p-4">
        <TiTick className="w-12 h-12 mx-auto text-green-500 border rounded-full bg-white" />
        <h4 className="text-xl font-bold">
          Successfully completed Your Appointment.
        </h4>
        <p>
        Hope you had a good session with the doctor and we are here for your future assistance.
      </p>
        <p>Thank You.</p>
        <button className="bg-teal-600 px-4 py-2 rounded text-white font-bold" onClick={handleHome}>Home</button>
      </div>
    </div>
   
         





    </>
  )
}

export default Feedback
