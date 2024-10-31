import Tourist from "./Component/Tourist";
import AddTour from "./Component/AddTour";
import Register from "./Component/Credentials/Register";
import Login from "./Component/Credentials/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
    
    {/* <h1 className="text-center">Tourist App</h1> */}
    {/* <Login />
    <Register />
    <Tourist />
    <AddTour /> */}

    <BrowserRouter>

      <Routes>

        <Route exact path="/" element={<Login />} ></Route>
        <Route exact path="register/" element={<Register />} />
        <Route exact path="places/" element={<Tourist />} />
        <Route exact path="addplaces/" element={<AddTour />} />



      </Routes>
    
    
    </BrowserRouter>
    
    </>
  );
}

export default App;
