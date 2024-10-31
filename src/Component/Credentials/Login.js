import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {


    const [formdata, setForm] = useState({});
    const navigate=useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({
            ...formdata,
            [name]: value,
        });
    };


    const handleSubmit = async(e)=>{

        e.preventDefault();
        console.log(formdata)

        try{
            const response=await fetch('http://127.0.0.1:8000/verifylogin/', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formdata)
            })
            if(response.ok){
                toast.success("Login Sucessfull"+" "+ formdata.username,{
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                })
                navigate('/places')
            }else{
                toast.error("Invalid Credentials"+" "+ formdata.username,{
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                })  
            }
        }catch(error){
            console.log("Error Occured!!")

        }

    }



  return (
    <>
    
                <div className='container shadow' style={{ 
                background: 'linear-gradient(to bottom, #00796b, #004d40)', // Dark aqua gradient
                width: '40%', 
                marginBottom: 50, 
                marginTop: 80, 
                borderRadius: '15px' // Smooth border radius
            }}>
                <h1 className='text-center' style={{ color: 'white' }}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" style={{ color: 'white' }}>User-Name</label>
                        <input 
                            type="text" 
                            name="username" 
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

                    <button type="submit" className="btn btn-primary" style={{ marginLeft: 250, marginBottom: 20 }}>Submit</button>
                </form>
                <p style={{ paddingBlock: 10, paddingLeft: 150, color: 'aqua  ' }}>
                    <b>Don't Have an Account?</b>
                    <Link to="/register" style={{ color: 'red' }}> Register Here</Link>
                </p>
            </div>




    
    </>
  )
}

export default Login
