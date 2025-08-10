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
  firstname: yup
    .string()
    .max(10, "Must not exceed 10 characters")
    .required("First name is required"),
  lastname: yup
    .string()
    .max(10, "Must not exceed 10 characters")
    .required("Last name is required"),
  phone: yup
    .string()
    .max(10, "Phone number must not exceed 10 digits")
    .required("Phone number is required"),
  color: yup
    .string()
    .min(3, "Color must be at least 3 characters")
    .max(10, "Must not exceed 10 characters"),

  plate: yup
    .string()
    .min(10, "Plate must be at least 3 characters")
    .max(20, "Must not exceed 10 characters"),

  capacity: yup
    .string()
    .min(1, "Capacity must be at least 1")
    .max(10, "Capacity must not exceed 10"),
});

const UserSignup = () => {
  const { CaptainSignup } = userAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    localStorage.setItem("captainEmail", data.email);
    try {
      await CaptainSignup(data);
      navigate("/verify-captain");
    } catch (error) {
      console.log(error);
    }

    reset();
  };

  return (
    <div className="w-full p-7 h-full flex flex-col justify-between">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <img
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="Uber Logo"
          className="w-16 mb-10"
        />

        {/* Name Field */}

        <div className="w-full flex items-center justify-center gap-5">
          <div className="w-1/2">
            <h3 className="text-lg mb-2 font-semibold">First Name</h3>
            <input
              {...register("firstname")}
              placeholder="First Name"
              type="text"
              className="w-full px-4 py-2 rounded bg-[#eeeeee] outline-0"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <h3 className="text-lg mb-2 font-semibold">Last Name</h3>
            <input
              {...register("lastname")}
              placeholder="Last Name"
              type="text"
              className="w-full px-4 py-2 rounded bg-[#eeeeee] outline-0"
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm">{errors.lastname.message}</p>
            )}
          </div>
        </div>

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

        {/* Phone Field */}
        <h3 className="text-lg mb-2 font-semibold">Contact Number </h3>
        <input
          {...register("phone")}
          placeholder="+91 12345 67891"
          type="number"
          className="w-full px-4 py-2 rounded bg-[#eeeeee] outline-0"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
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

        {/* Color & plate  */}
        <div className="w-full flex items-center justify-center gap-5">
          <div className="w-1/2">
            <h3 className="text-lg mb-2 font-semibold">Color</h3>
            <input
              {...register("color")}
              placeholder="Color"
              type="text"
              className="w-full px-4 py-2 rounded bg-[#eeeeee] outline-0"
            />
            {errors.color && (
              <p className="text-red-500 text-sm">{errors.color.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <h3 className="text-lg mb-2 font-semibold">Plate</h3>
            <input
              {...register("plate")}
              placeholder="Plate"
              type="text"
              className="w-full px-4 py-2 rounded bg-[#eeeeee] outline-0"
            />
            {errors.plate && (
              <p className="text-red-500 text-sm">{errors.plate.message}</p>
            )}
          </div>
        </div>

        {/* Capacity & Type  */}
        <div className="w-full flex items-center justify-center gap-5">
          <div className="w-1/2">
            <h3 className="text-lg mb-2 font-semibold">Capacity</h3>
            <input
              {...register("capacity")}
              placeholder="Capacity"
              type="number"
              className="w-full px-4 py-2 rounded bg-[#eeeeee] outline-0"
            />
            {errors.capacity && (
              <p className="text-red-500 text-sm">{errors.capacity.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <h3 className="text-lg mb-2 font-semibold">Type</h3>

            <select
              {...register("type")}
              className="w-full px-4 py-2 rounded bg-[#eeeeee] outline-0"
            >
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
            {errors.plate && (
              <p className="text-red-500 text-sm">{errors.plate.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#252525] text-white py-2 rounded"
        >
          Sign Up
        </button>

        {/* Signup Link */}
        <div className="w-full text-sm space-x-1 flex items-center justify-center">
          <div>Already a Captain?</div>
          <NavLink to="/login" className="text-indigo-500">
            Login
          </NavLink>
        </div>
      </form>

      {/* Captain Login */}
      <NavLink
        to="/signup"
        className="w-full mt-5 flex items-center justify-center bg-amber-400 py-3 rounded text-white"
      >
        Register as a User
      </NavLink>
    </div>
  );
};

export default UserSignup;
