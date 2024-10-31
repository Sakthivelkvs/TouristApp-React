import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Tourist() {
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState({});

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/create/')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log("Error!!");
            });
    }, [data]);

    const updateDetails = (id) => {
        console.log("Selected item", id);
        fetch(`http://127.0.0.1:8000/view/${id}`)
            .then(response => response.json())
            .then(res => setUpdate(res));
    };

    const handleInput = (event, fieldname) => {
        const val = event.target.value;
        setUpdate((prevUpdate) => ({
            ...prevUpdate,
            [fieldname]: val,
        }));
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        console.log("Submit function triggered!");

        const updateval = {
            id: update.id,
            Place_Name: update.Place_Name,
            Weather: update.Weather,
            State: update.State,
            District: update.District,
            Google_Map_Link: update.Google_Map_Link,
            Description: update.Description,
        };

        console.log("Data is: ", updateval);

        try {
            const result = await axios.put(`http://127.0.0.1:8000/update/${id}/`, updateval, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(result);
        } catch (error) {
            console.error("Error occurred during the PUT request:", error.response ? error.response.data : error.message);
        }

        toast.success("Update Successful", {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
        });
    };

    const handleDelete = (id) => {
        fetch('http://127.0.0.1:8000/delete/' + id, { method: 'DELETE' })
            .then(() => {
                console.log("Deleted");
            });

        toast.error("Deleted", {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
        });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 3;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordPerPage);
    const numbers = Array.from({ length: npage }, (_, i) => i + 1);

    function prevPage() {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1);
        }
    }

    function changePage(id) {
        setCurrentPage(id);
    }

    return (
        <>

<div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '20px', background: 'linear-gradient(to right, #00796b, #004d40)', padding: '10px', borderRadius: '8px' }}>
    <h1 className="text-center" style={{ color: 'white' }}>Tourist Table</h1>
    <Link to="/" className="btn btn-danger"> Logout </Link>
</div>


            <h1 className="text-center" style={{ marginTop: '20px' }}>Tourist Places</h1>  
            <div className='container-lg p-7'>
                <table className="table table-hover table-bordered table-dark  " style={{ marginTop: '10px' }}>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Place Name</th>
                            <th scope="col">Weather</th>
                            <th scope="col">Location</th>
                            <th scope="col">Google Map Link</th>
                            <th scope="col">Image</th>
                            <th scope="col">Description</th>
                            <th scope="col">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records.map((i) => (
                                <tr key={i.id}>
                                    <th scope="row">{i.id}</th>
                                    <td>{i.Place_Name}</td>
                                    <td>{i.Weather}</td>
                                    <td>{i.State}, {i.District}</td>
                                    <td>
                                        <a href={i.Google_Map_Link} target="_blank" rel="noopener noreferrer">
                                            Click Me
                                        </a>
                                    </td>
                                    <td>
                                        <img 
                                            src={`http://127.0.0.1:8000${i.Image}`} 
                                            style={{ height: 50, borderRadius: "50px" }} 
                                        />
                                        {i.Place_Name}
                                    </td>
                                    <td>{i.Description}</td>
                                    <td>
                                        <button className='btn btn-success' onClick={() => { updateDetails(i.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button> &nbsp; 
                                        <button className='btn btn-danger' onClick={() => { updateDetails(i.id) }} data-bs-toggle="modal" data-bs-target="#exampleModals">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    {/* Paginator Section */}
                    <nav aria-label="...">
                        <ul className="pagination dark-pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={prevPage}>Previous</a>
                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <a className="page-link" href="#" onClick={() => changePage(n)}>{n}</a>
                                    </li>
                                ))
                            }
                            <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={nextPage} href="#">Next</a>
                            </li>
                        </ul>
                    </nav>

                    {/* Add New Place Button Section */}
                    <div>
                        
                        <Link to="/addplaces" className="btn btn-primary"> AddNew Place</Link>
                        
                    </div>
                </div>
            </div>




            {/* Update Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={{ 
            background: 'linear-gradient(to bottom, #00796b, #004d40)', // Dark aqua gradient
            borderRadius: '15px' // Smooth border radius
        }}>
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: 'white' }}>Update</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className='container'>
                    <form onSubmit={(e) => handleSubmit(e, update.id)}>
                        <div className='mb-3'>
                            <label className="form-label" style={{ color: 'white' }}>Place Name</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                value={update.Place_Name} 
                                onChange={(event) => handleInput(event, 'Place_Name')} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label" style={{ color: 'white' }}>Weather</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                value={update.Weather} 
                                onChange={(event) => handleInput(event, 'Weather')} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label" style={{ color: 'white' }}>State</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                value={update.State} 
                                onChange={(event) => handleInput(event, 'State')} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label" style={{ color: 'white' }}>District</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                value={update.District} 
                                onChange={(event) => handleInput(event, 'District')} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label" style={{ color: 'white' }}>Map Link</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                value={update.Google_Map_Link} 
                                onChange={(event) => handleInput(event, 'Google_Map_Link')} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label" style={{ color: 'white' }}>Description</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                value={update.Description} 
                                onChange={(event) => handleInput(event, 'Description')} 
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white' }} // Lighter input field to match background
                            />
                        </div>
                        <button type="submit" className="btn btn-success" style={{ marginTop: '10px',marginLeft: 270, marginBottom: 0  }}>Save changes</button>
                    </form>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>


            {/* Delete Modal */}
            <div className="modal fade" id="exampleModals" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ 
                        background: 'linear-gradient(to bottom, #00796b, #004d40)', // Dark aqua gradient
                        borderRadius: '15px' // Smooth border radius
                    }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{ color: 'white' }}>Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ color: 'white' }}>
                            Are you sure you want to delete this item?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={() => { handleDelete(update.id) }} data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Tourist;
