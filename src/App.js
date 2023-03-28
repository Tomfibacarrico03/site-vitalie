import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import PostJob from "./pages/postJob";
import SignUp from "./pages/SignUp";
import TradesPage from "./pages/TradesPage";
import Login from "./pages/Login";
import MyPostedJobs from "./pages/MyPostedJobs";
import JobPage from "./pages/JobPage";
import WorkerPage from "./pages/WorkerPage";

import SideBar from "./pages/dashboard/Sidebar";
import NearTrades from "./pages/dashboard/NearTrades";
import InterestedTrades from "./pages/dashboard/InterestedTrades";
import Inbox from "./pages/dashboard/Inbox";
import Chat from "./pages/dashboard/Chat";

import AccountSideBar from "./pages/account/AccountSideBar";
import MyAccount from "./pages/account/MyAccount";
import TradesProfile from "./pages/account/TradesProfile";
import Settings from "./pages/account/Settings";


import { AuthContextProvider } from "./context/AuthContext";



function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <NavBar />
        <SideBar />
        <AccountSideBar/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postjob" element={<PostJob />} />
          <Route path="/aplicativo-de-comerciante" element={<SignUp />} />
          <Route path="/entrar" element={<Login />} />
          <Route
            path="/registrar-como-comerciante"
            element={<TradesPage />}
          />
          <Route path="/minha-conta/detalhes-de-contacto" element={<MyAccount />} />
          <Route path="/minha-conta/perfil-de-trabalhador" element={<TradesProfile />} />
          <Route path="/minha-conta/definições" element={<Settings />} />
          <Route path="/meustrabalhos" element={<MyPostedJobs />} />
          <Route path="/meustrabalhos/:id" element={<JobPage />} />
          <Route
            path="/dashboard-de-trabalhos/trabalhos-proximos"
            element={<NearTrades />}
          />
          <Route
            path="/dashboard-de-trabalhos/interessado"
            element={<InterestedTrades />}
          />
          <Route path="/dashboard-de-trabalhos/mensagens" element={<Inbox/>} />
          <Route path="/inbox/chat/:id" element={<Chat />} />

          <Route path="/trabalhador/:id" element={<WorkerPage />} />
        </Routes>

        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
