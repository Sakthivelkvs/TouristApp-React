import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [formdata, setForm] = useState({});
    const navigate=useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({
            ...formdata,
            [name]: value,
        });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Data is: ", formdata);

        // // Create FormData and append all form fields and the image
        // const formDataImage = new FormData();
        // formDataImage.append("Place_Name", formdata.Place_Name);
        // formDataImage.append("Weather", formdata.Weather);
        // formDataImage.append("State", formdata.State);
        // formDataImage.append("District", formdata.District);
        // formDataImage.append("Google_Map_Link", formdata.Google_Map_Link);
        // formDataImage.append("Image", file); // Append the file here
        // formDataImage.append("Description", formdata.Description);

        try {
            const response = await axios.post('http://127.0.0.1:8000/adminreg/', formdata,  {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                toast.success("Inserted Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored',
                });

                // Clear form data after successful insertion
                setForm({});
                
            }

            navigate('/')

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
                <h1 className='text-center' style={{ color: 'white' }}>Admin Registration</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" style={{ color: 'white' }}>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            className="form-control" 
                            onChange={handleInput} 
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" style={{ color: 'white' }}>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control" 
                            onChange={handleInput} 
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" style={{ color: 'white' }}>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control" 
                            onChange={handleInput} 
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" style={{ color: 'white' }}>Confirm Password</label>
                        <input 
                            type="password" 
                            name="conf_password" 
                            className="form-control" 
                            onChange={handleInput} 
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                        />
                    </div>
                
                    <button type="submit" className="btn btn-primary" style={{ marginLeft: 200, marginBottom: 20 }}>Submit</button>
                </form>
            </div>



    
    
    </>
  )
}
