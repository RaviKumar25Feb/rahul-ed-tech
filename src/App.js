import "./App.css";
import { Route, Routes } from "react-router-dom";

// public routes
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";

// private routes
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import ResetComplte from "./pages/ResetComplte";
import About from "./pages/About";
import Contact from "./pages/Contact";


function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

      <Navbar />

      <Routes>

        {/* Homepage -> common page everyone can visit */}
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        {/* Signup ka page -> it is not common for every user, only unknown user */}
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* login ka page -> it is also not common for every user, only for unknwn user */}
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        {/* Forgot password wala route */}
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        {/* update password wala route */}
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        {/* Reset complete page */}
        <Route
          path="/reset-complete"
          element={
            <OpenRoute>
              <ResetComplte />
            </OpenRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
