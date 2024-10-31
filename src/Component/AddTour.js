import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddTour() {
    const [formdata, setForm] = useState({});
    const [file, setFile] = useState(null); // Separate state for the file
    const navigate=useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({
            ...formdata,
            [name]: value,
        });
    };

    const handleInputImage = (e) => {
        setFile(e.target.files[0]); // Store the file in a separate state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Data is: ", formdata);

        // Create FormData and append all form fields and the image
        const formDataImage = new FormData();
        formDataImage.append("Place_Name", formdata.Place_Name);
        formDataImage.append("Weather", formdata.Weather);
        formDataImage.append("State", formdata.State);
        formDataImage.append("District", formdata.District);
        formDataImage.append("Google_Map_Link", formdata.Google_Map_Link);
        formDataImage.append("Image", file); // Append the file here
        formDataImage.append("Description", formdata.Description);

        try {
            const response = await axios.post('http://127.0.0.1:8000/create/', formDataImage, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                toast.success("Inserted Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored',
                });

                navigate('/places')



                // Clear form data after successful insertion
                setForm({});
                setFile(null); // Clear the file state
            }

        } catch (error) {
            console.log("Error!!", error);
            toast.error("Failed to Insert", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
        }
    };

    return (
        <>
                            <div className='container shadow' style={{ 
                    background: 'linear-gradient(to bottom, #00796b, #004d40)', // Dark aqua gradient
                    width: '40%', 
                    marginBottom: 50, 
                    marginTop: 80, 
                    borderRadius: '15px' // Smooth border radius
                }}>
                    <h1 className='text-center' style={{ color: 'white' }}>Add Place</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: 'white' }}>Place Name</label>
                            <input 
                                type="text" 
                                name="Place_Name" 
                                className="form-control" 
                                onChange={handleInput} 
                                value={formdata.Place_Name || ''} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: 'white' }}>Weather</label>
                            <input 
                                type="text" 
                                name="Weather" 
                                className="form-control" 
                                onChange={handleInput} 
                                value={formdata.Weather || ''} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: 'white' }}>State</label>
                            <input 
                                type="text" 
                                name="State" 
                                className="form-control" 
                                onChange={handleInput} 
                                value={formdata.State || ''} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: 'white' }}>District</label>
                            <input 
                                type="text" 
                                name="District" 
                                className="form-control" 
                                onChange={handleInput} 
                                value={formdata.District || ''} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: 'white' }}>Map Link</label>
                            <input 
                                type="text" 
                                name="Google_Map_Link" 
                                className="form-control" 
                                onChange={handleInput} 
                                value={formdata.Google_Map_Link || ''} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: 'white' }}>Image</label>
                            <input 
                                type="file" 
                                name="Image" 
                                accept='image/*' 
                                className="form-control" 
                                onChange={handleInputImage} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: 'white' }}>Description</label>
                            <textarea 
                                className="form-control" 
                                name="Description" 
                                onChange={handleInput} 
                                value={formdata.Description || ''} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginLeft: 200, marginBottom: 20 }}>Submit</button>
                    </form>
                </div>

        </>
    );
}

export default AddTour;
