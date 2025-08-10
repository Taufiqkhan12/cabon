import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import { Toaster } from "react-hot-toast";
import Start from "./pages/Start";
// import userAuth from "./store/UserAuth";
import CaptainOtp from "./pages/CaptainOtp";
import UserOtp from "./pages/UserOtp";
import Riding from "./pages/Riding";
import CaptainHome from "./pages/CaptainHome";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  // const { userAuthData } = userAuth();

  return (
    <div className="font-sans">
      <Toaster containerClassName="text-center" />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/verify-user" element={<UserOtp />} />
        <Route path="/riding" element={<Riding />} />

        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/verify-captain" element={<CaptainOtp />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />

        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />

        <Route
          path="/captain-home"
          element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
