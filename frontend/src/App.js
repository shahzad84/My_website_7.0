
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid">
      <Routes>
          <Route exact path="/" element={<Navbar />}/>
        
      </Routes>
      </div>
      
      
    </BrowserRouter>
    </div>
  );
}

export default App;
