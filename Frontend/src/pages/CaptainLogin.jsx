import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import userAuth from "../store/UserAuth";

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const CaptainLogin = () => {
  const { CaptainLogin } = userAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    localStorage.setItem("captainEmail", data.email);
    try {
      await CaptainLogin(data, navigate);
      navigate("/captain-home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-7 h-screen flex flex-col justify-between">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <img
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="Uber Logo"
          className="w-16 mb-10"
        />
        {/* Email Field */}
        <h3 className="text-lg mb-2 font-semibold">What's your email</h3>
        <input
          {...register("email")}
          placeholder="email@example.com"
          type="email"
          className="w-full px-4 py-2 rounded bg-[#eeeeee] outline-0"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password Field */}
        <h3 className="text-lg mb-2 font-semibold">Enter your password</h3>
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          className="w-full px-4 py-2 rounded bg-[#eeeeee] outline-0"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#252525] text-white py-2 rounded"
        >
          Login
        </button>

        {/* Signup Link */}
        <div className="w-full text-sm space-x-1 flex items-center justify-center">
          <div>Want to join us?</div>
          <NavLink to="/captain-signup" className="text-indigo-500">
            Register as a captain
          </NavLink>
        </div>
      </form>

      {/* Captain Login */}
      <NavLink
        to="/login"
        className="w-full flex items-center justify-center bg-orange-400 py-3 rounded text-white"
      >
        Sign in as an User
      </NavLink>
    </div>
  );
};

export default CaptainLogin;
