import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import doctorAxios from '../../services/doctorAxiosInterceptor.js'
import { Link, useNavigate } from 'react-router-dom';

function CreatePrescription() {
    const userData = useSelector(state => state.prescription.data);
    const doctorToken = localStorage.getItem('doctorToken');
    const descriptionRef = useRef();
    const doseRef = useRef();
    const history = useNavigate();
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [dose, setDose] = useState('');
    const [medDetails, setMedDetails] = useState(new Map());
    const navigate = useNavigate();
    const [mor, setMor] = useState(false);
    const [aft, setAft] = useState(false);
    const [evg, setEvg] = useState(false);
    const [err, setErr] = useState('')

    useEffect(() => {
        if (!userData.userData) {
            navigate('/doctor-consultation');
        }
    }, [navigate, userData]);

    const handleUpload = useCallback(async () => {
        const id = userData._id;
        const payload = Array.from(medDetails).map(([medicine, selectedDose]) => ({
            medicine,
            selectedDose,
            id
        }));
        console.log("typed data: **((())))))****",payload);
        await doctorAxios.patch( 'doctor/addPrescription', payload)
        .then(res => {
            if (res.data === 'done') {
                history('/doctor-consultation');
            }
        });
    }, [history, medDetails, userData._id]);

    const handleAddClick = useCallback(() => {
        let med = '';
        if (mor) {
            med = '1';
        } else {
            med = '0';
        }
        if (aft) {
            med = med + '-' + '1';
        } else {
            med = med + '-' + '0';
        }
        if (evg) {
            med = med + '-' + '1';
        } else {
            med = med + '-' + '0';
        }

        const isValidMedicine = (medicine) => {
            // Regular expression to match at least one alphanumeric character or special character
            const regex = /[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            return regex.test(medicine);
        };

        if (!isValidMedicine(selectedMedicine)) {
            setErr('Please enter a valid medicine');
            return; // Added return to stop execution if validation fails
        }



        if(!selectedMedicine || !dose){
            setErr('pleace enter details')
        }

        if (selectedMedicine && dose) {
            setMedDetails(prev => {
                const updated = new Map(prev);
                updated.set(selectedMedicine, dose + 'mg ' + med + ' ' + descriptionRef.current.value);
                return updated;
            });
            setSelectedMedicine('');
            setDose('');
        }
    }, [aft, descriptionRef, dose, evg, mor, selectedMedicine]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-center text-4xl text-teal-600 font-bold mb-4 underline">Prescription</h2><br/>
            <div className="bg-white p-4">
            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4>Patient : {userData.userData ? userData.userData[0].userName : ''}</h4>
                        <h5>Date : {userData?.date}</h5>
                        <h5>Time : {userData?.time}</h5>
                    </div>
                    <div>
                        <h5>Health issue :</h5>
                        <p>{userData?.issues}</p>
                    </div>
                </div>
                {err === 'Please enter a valid medicine' && <span className='text-red-500'>{err}</span>}
                {err === 'pleace enter details' && <span className='text-red-500'>{err}</span>}

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 bg-gray-100 p-4 rounded-lg">
                
    <div className="col-span-1">
        
        <input
            type="text"
            placeholder="Medicine"
            value={selectedMedicine}
            onChange={(e) => setSelectedMedicine(e.target.value)}
            className="form-control rounded-lg border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 w-full px-3 py-2"
        />
    </div>
    <div className="col-span-1">
        <input
            type="text"
            placeholder="Dose"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            className="form-control rounded-lg border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 w-full px-3 py-2"
        />
    </div>
    <div className="col-span-1 flex items-center">
        <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="morning"
            onChange={() => setMor(!mor)}
        />
        <label className="form-check-label ml-2" htmlFor="morning">
            Mor
        </label>
    </div>
    <div className="col-span-1 flex items-center">
        <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="afternoon"
            onChange={() => setAft(!aft)}
        />
        <label className="form-check-label ml-2" htmlFor="afternoon">
            Aft
        </label>
    </div>
    <div className="col-span-1 flex items-center">
        <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="evening"
            onChange={() => setEvg(!evg)}
        />
        <label className="form-check-label ml-2" htmlFor="evening">
            Evg
        </label>
    </div>
    <div className="col-span-5 md:col-span-1">
        <input
            className="form-control rounded-lg border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 w-full px-3 py-2 mt-2 md:mt-0"
            ref={descriptionRef}
            placeholder="Description..."
            type="text"
        />
    </div>
    <div className="col-span-5 md:col-span-1 flex justify-center items-center">
        <button className="text-white font-bold text-lg border py-2 px-4 rounded bg-teal-500 mx-4" onClick={handleAddClick}>
            Add
        </button>
    </div>
</div>

                <h4>Prescription:</h4>
                {Array.from(medDetails).map(([medicine, selectedDose]) => (
                    <div key={medicine}>
                        <p>
                            {medicine}: {selectedDose}
                        </p>
                    </div>
                ))}
                <div className="row flex justify-center">
                    <button className="text-white font-bold text-lg border py-2 px-4 rounded bg-teal-500 mx-4" onClick={handleUpload}>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePrescription;
