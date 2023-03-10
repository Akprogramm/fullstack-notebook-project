// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home'
import About from './components/About'
// import Nopage from './components/Nopage';
import NoteState from './context/notes/NoteState';
import Alert from "./components/Alert.js"
import Login from "./components/Login"
import Signup from "./components/Signup"

function App() {
  return (
    <NoteState>
    <div className="App">
     <BrowserRouter>
     <Navbar/>
     <Alert message={"hello"}/>
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="about" element={<About />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>

    </div>    
     </NoteState>
  );
}

export default App;
