import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import PostJob from "./pages/PostJob";
import SignUp from "./pages/SignUp";
import PostedJob from "./pages/PostedJob";
import TradesPage from "./pages/TradesPage";
import Login from "./pages/Login";
import MyPostedJobs from "./pages/MyPostedJobs";
import JobPage from "./pages/JobPage";
import WorkerPage from "./pages/WorkerPage";
import InviteWorkers from "./pages/InviteWorkers";
import LeaveReview from "./pages/LeaveReview";

import SideBar from "./pages/dashboard/Sidebar";
import NearTrades from "./pages/dashboard/NearTrades";
import InterestedTrades from "./pages/dashboard/InterestedTrades";
import ShortlistedTrades from "./pages/dashboard/ShortlistedTrades";
import InvitedTrades from "./pages/dashboard/InvitedTrades";
import WonTrades from "./pages/dashboard/WonTrades";
import Inbox from "./pages/dashboard/Inbox";
import Chat from "./pages/dashboard/Chat";

import AccountSideBar from "./pages/account/AccountSideBar";
import MyAccount from "./pages/account/MyAccount";
import TradesProfile from "./pages/account/TradesProfile";
import Settings from "./pages/account/Settings";
import Payments from "./pages/account/Payments";
import ForgotPassword from "./pages/dashboard/ForgotPassword";
import Sucesso from "./pages/account/pagamentos/Sucesso";
import Erro from "./pages/account/pagamentos/Erro";
import Creditos from "./pages/account/Creditos";

import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <NavBar />
        <SideBar />
        <AccountSideBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recuperar-palavra-passe" element={<ForgotPassword />} />
          <Route path="/publicar-trabalho" element={<PostJob />} />

          <Route
            path="/publicar-trabalho/:jobId/publicado"
            element={<PostedJob />}
          />
          <Route path="/aplicativo-de-comerciante" element={<SignUp />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/registrar-como-comerciante" element={<TradesPage />} />
          <Route
            path="/minha-conta/detalhes-de-contacto"
            element={<MyAccount />}
          />
          <Route
            path="/minha-conta/perfil-de-trabalhador"
            element={<TradesProfile />}
          />
          <Route path="/minha-conta/creditos" element={<Creditos />} />
          <Route path="/minha-conta/pagamentos" element={<Payments />} />
          <Route path="/minha-conta/pagamentos/sucesso" element={<Sucesso />} />
          <Route path="/minha-conta/pagamentos/erro" element={<Erro />} />
          <Route path="/minha-conta/definições" element={<Settings />} />
          <Route path="/meustrabalhos" element={<MyPostedJobs />} />
          <Route path="/meustrabalhos/:jobId" element={<JobPage />} />
          <Route
            path="/meustrabalhos/:jobId/trabalhador/:workerId"
            element={<WorkerPage />}
          />
          <Route
            path="/meustrabalhos/:jobId/deixar-critica/trabalhador/:workerId"
            element={<LeaveReview />}
          />
          <Route
            path="/convidar-trabalhadores/:jobId"
            element={<InviteWorkers />}
          />
          <Route
            path="/dashboard-de-trabalhos/trabalhos-proximos"
            element={<NearTrades />}
          />
          <Route
            path="/dashboard-de-trabalhos/interessado"
            element={<InterestedTrades />}
          />
          <Route
            path="/dashboard-de-trabalhos/lista-restrita"
            element={<ShortlistedTrades />}
          />
          <Route
            path="/dashboard-de-trabalhos/trabalhos-ganhos"
            element={<WonTrades />}
          />
          <Route
            path="/dashboard-de-trabalhos/convites"
            element={<InvitedTrades />}
          />
          <Route path="/dashboard-de-trabalhos/mensagens" element={<Inbox />} />
          <Route path="/inbox/chat/:id" element={<Chat />} />
        </Routes>

        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
