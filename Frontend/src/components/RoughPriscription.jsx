import React, {  useCallback, useEffect, useRef, useState  } from 'react';
import axios from '../../services/axiosInterceptor.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


function CreatePrescription() {

    const userData = useSelector((state) => state.prescription.data)
    console.log("userData from prescription store:",userData);
    const [patientName, setPatientName] = useState(userData.userData[0].userName);
    const [age, setAge] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [medicines, setMedicines] = useState([{ name: '', dose: '' }]);

    const handleChange = (index, key, value) => {
        const updatedMedicines = [...patientDetails.medicines];
        updatedMedicines[index][key] = value;
        setPatientDetails({ ...patientDetails, medicines: updatedMedicines });
    };

    const addMedicine = () => {
        setPatientDetails({
            ...patientDetails,
            medicines: [...patientDetails.medicines, { name: '', dose: '' }]
        });
    };

    const handleSubmit = async () => {
        try {
            // Send prescription data to the backend
            const response = await axios.post('/prescriptions', patientDetails);
            console.log('Prescription added:', response.data);
            // Optionally, you can reset the form after successful submission
            setPatientDetails({
                patientName: '',
                age: '',
                diagnosis: '',
                medicines: [{ name: '', dose: '' }]
            });
        } catch (error) {
            console.error('Error adding prescription:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 ">
            <h2 className="text-center text-4xl text-teal-600 font-bold mb-4 underline">Create Prescription</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-teal-500 font-bold mb-2">Patient Name:</label>
                    <input
                        type="text"
                        value={patientDetails.patientName}
                        onChange={(e) => setPatientDetails({ ...patientDetails, patientName: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-teal-500 font-bold mb-2">Age:</label>
                    <input
                        type="number"
                        value={patientDetails.age}
                        onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-teal-500 font-bold mb-2">Diagnosis:</label>
                    <input
                        type="text"
                        value={patientDetails.diagnosis}
                        onChange={(e) => setPatientDetails({ ...patientDetails, diagnosis: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4 ">
                    <h3 className="text-lg font-semibold mb-2 text-teal-500">Medicines:</h3>
                    {patientDetails.medicines.map((medicine, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                value={medicine.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                placeholder="Medicine Name"
                                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                            />
                            <input
                                type="text"
                                value={medicine.dose}
                                onChange={(e) => handleChange(index, 'dose', e.target.value)}
                                placeholder="Dose"
                                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addMedicine} className="text-teal-500 font-bold">Add Medicine</button>
                </div>
                <button type="submit" className="bg-teal-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Prescription</button>
            </form>
        </div>
    );
}

export default CreatePrescription;
