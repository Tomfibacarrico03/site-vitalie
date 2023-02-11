import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import PostJob from "./pages/postJob";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postjob" element={<PostJob />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
