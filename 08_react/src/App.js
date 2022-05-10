import './App.css';
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
            </Routes>
        </BrowserRouter>
        <Footer/>
    </div>
  );
}

export default App;
