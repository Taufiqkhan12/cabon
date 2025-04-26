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

const UserLogin = () => {
  const { userLogin } = userAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    try {
      await userLogin(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full md:w-1/2 mx-auto p-7 h-screen md:shadow-xl flex flex-col justify-between">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
        noValidate
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
        <button className="w-full bg-[#252525] text-white py-2 rounded">
          Login
        </button>

        {/* Signup Link */}
        <div className="w-full text-sm space-x-1 flex items-center justify-center">
          <div>New here?</div>
          <NavLink to="/signup" className="text-indigo-500">
            Create an account
          </NavLink>
        </div>
      </form>

      {/* Captain Login */}
      <NavLink
        to="/captain-login"
        className="w-full flex items-center justify-center bg-emerald-400 py-3 rounded text-white"
      >
        Sign In as a Captain
      </NavLink>
    </div>
  );
};

export default UserLogin;
