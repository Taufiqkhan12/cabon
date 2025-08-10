import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import userAuth from "../store/UserAuth";
import { useNavigate } from "react-router-dom";

const CaptainOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const { handleSubmit } = useForm();
  const { VerifyCaptain, ResendCaptainOtp } = userAuth();
  const navigate = useNavigate();

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next field
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Handle Submit
  const onSubmit = async () => {
    const data = {
      otp: otp.join(""),
      email: localStorage.getItem("captainEmail"),
    };
    try {
      await VerifyCaptain(data);
      navigate("/captain-login");
    } catch (error) {
      console.log(error);
    }
  };

  // Resend OTP Handler
  const handleResendOTP = async () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    const email = localStorage.getItem("captainEmail");
    try {
      await ResendCaptainOtp(email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(
      () => setTimer((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
        <p className="text-center text-black mb-6">
          We've sent a 6-digit OTP to your email.
        </p>

        {/* OTP Inputs */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center gap-3 mb-4"
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 md:w-12 h-10 md:h-12 text-xl text-center border border-black rounded focus:outline-none focus:border-gray-500 text-black transition"
            />
          ))}
        </form>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={otp.includes("")}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            otp.includes("")
              ? "bg-black cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Verify OTP
        </button>

        {/* Resend OTP */}
        <div className="text-center text-xs mt-4">
          {timer > 0 ? (
            <p className="text-gray-400">Resend OTP in {timer}s</p>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-blue-400 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptainOtp;
