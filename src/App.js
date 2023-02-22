import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import PostJob from "./pages/postJob";
import SignUp from "./pages/SignUp";
import RegistoComerciante from "./pages/RegistoComerciante";
import MyAccount from "./pages/MyAccount";
import Login from "./pages/Login";
import MyPostedJobs from "./pages/MyPostedJobs";
import { AuthContextProvider } from './context/AuthContext'

function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/aplicativo-de-comerciante" element={<SignUp/>} />
        <Route path="/entrar" element={<Login/>} />
        <Route path="/registrar-como-comerciante" element={<RegistoComerciante/>} />
        <Route path="/minha-conta" element={<MyAccount/>} />
        <Route path="/meustrabalhos" element={<MyPostedJobs/>} />
      </Routes>

      <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
