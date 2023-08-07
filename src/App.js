import './App.css';
// import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
// import Alert from './components/Alert';
import toast, { Toaster } from 'react-hot-toast';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  // const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    }
    else {
      toast.error(message);
    }
  }
  return (
    <>

      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert}/>
          {/* <Alert alert={alert} /> */}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="/profile" element={<Profile showAlert={showAlert} />}/>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
      <Toaster/>
    </>
  );
}

export default App;
