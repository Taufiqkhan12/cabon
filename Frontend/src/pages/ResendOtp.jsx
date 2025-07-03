// ResendOtpPage.jsx
import React from "react";
import { useForm } from "react-hook-form";
import userAuth from "../store/UserAuth";
import { useNavigate } from "react-router-dom";

const ResendOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const { ResendCaptainOtp } = userAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Resend OTP request for:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-8">
        <h2 className="text-xl font-bold mb-6 text-center">Resend Otp</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm mb-2">
              Enter your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="p-3 rounded-md bg-transparent border border-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.email && (
              <span className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </span>
            )}
            <label htmlFor="User" className="text-sm mb-2 mt-5 ">
              Enter your Role
            </label>
            <select
              className="p-3 rounded-md bg-transparent border border-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              name=""
              id=""
              {...register("role")}
            >
              <option className="p-4" value="user">
                User
              </option>
              <option className="p-4" value="captain">
                Captain
              </option>
            </select>
            {errors.email && (
              <span className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 cursor-pointer bg-black text-white font-semibold rounded-md hover:bg-black/70 transition-all"
          >
            {isSubmitting ? "Sending..." : "Confirm"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResendOtp;
