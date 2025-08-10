/* eslint-disable no-unused-vars */
import { create } from "zustand";
import axiosInstance from "../axios/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const userAuth = create((set) => ({
  userAuthData: null,
  captainAuthData: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/check-auth", {
        withCredentials: true,
      });

      if (res.data) set({ userAuthData: res.data.data });
      return res;
    } catch (error) {
      // console.log(error);
    }
  },

  // User Login
  UserLogin: async (data, navigate) => {
    try {
      const res = await axiosInstance.post("/user/login", data, {
        withCredentials: true,
      });
      const msg = res?.data?.message;
      toast.success(msg);
    } catch (error) {
      // console.log(error);

      if (error?.response?.data?.data?.isVerified === false) {
        navigate("/verify-user");
      }

      const err = error?.response?.data?.message;
      if (!err) {
        toast.error("Something went wrong, please try again later.");
      } else {
        toast.error(err);
      }
      throw error;
    }
  },

  // User Signup

  UserSignup: async (data) => {
    try {
      const res = await axiosInstance.post("/user/register", data, {
        withCredentials: true,
      });
      const msg = res?.data?.message;
      toast.success(msg);
    } catch (error) {
      // console.log(error);
      const err = error?.response?.data?.message;

      if (!err) {
        toast.error("Something went wrong, please try again later.");
      } else {
        toast.error(err);
      }
      throw error;
    }
  },

  // User Otp verification

  VerifyUser: async (data) => {
    try {
      const res = await axiosInstance.post("/user/verify-email", data, {
        withCredentials: true,
      });
      const msg = res?.data?.message;
      toast.success(msg);
    } catch (error) {
      // console.log(error);
      const err = error?.response?.data?.message;

      if (!err) {
        toast.error("Something went wrong, please try again later.");
      } else {
        toast.error(err);
      }
      throw error;
    }
  },

  // Resend Captain Otp

  ResendUserOtp: async (data) => {
    try {
      const res = await axiosInstance.post(
        "/user/resend-otp",
        { email: data },
        {
          withCredentials: true,
        }
      );
      const msg = res?.data?.message;
      toast.success(msg);
    } catch (error) {
      // console.log(error);
      const err = error?.response?.data?.message;

      if (!err) {
        toast.error("Something went wrong, please try again later.");
      } else {
        toast.error(err);
      }
      throw error;
    }
  },

  // Captain Check Auth

  CaptainCheckAuth: async () => {
    try {
      const res = await axiosInstance.get("/captain/check-captain-auth", {
        withCredentials: true,
      });

      if (res.data) set({ captainAuthData: res.data?.data });
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  // Captain Login
  CaptainLogin: async (data, navigate) => {
    try {
      const res = await axiosInstance.post("/captain/login", data, {
        withCredentials: true,
      });
      const msg = res?.data?.message;
      toast.success(msg);
    } catch (error) {
      // console.log(error);

      if (error?.response?.data?.data?.isVerified === false) {
        navigate("/verify-captain");
      }

      const err = error?.response?.data?.message;
      if (!err) {
        toast.error("Something went wrong, please try again later.");
      } else {
        toast.error(err);
      }
      throw error;
    }
  },

  // Captain Signup

  CaptainSignup: async (data) => {
    try {
      const res = await axiosInstance.post("/captain/register", data, {
        withCredentials: true,
      });
      const msg = res?.data?.message;
      toast.success(msg);
    } catch (error) {
      // console.log(error);
      const err = error?.response?.data?.message;

      if (!err) {
        toast.error("Something went wrong, please try again later.");
      } else {
        toast.error(err);
      }
      throw error;
    }
  },

  // Captain Otp verification

  VerifyCaptain: async (data) => {
    try {
      const res = await axiosInstance.post("/captain/verify-email", data, {
        withCredentials: true,
      });
      const msg = res?.data?.message;
      toast.success(msg);
    } catch (error) {
      // console.log(error);
      const err = error?.response?.data?.message;

      if (!err) {
        toast.error("Something went wrong, please try again later.");
      } else {
        toast.error(err);
      }
      throw error;
    }
  },

  // Resend Captain Otp

  ResendCaptainOtp: async (data) => {
    try {
      const res = await axiosInstance.post(
        "/captain/resend-otp",
        { email: data },
        {
          withCredentials: true,
        }
      );
      // console.log(res);
      const msg = res?.data?.message;
      toast.success(msg);
    } catch (error) {
      // console.log(error);
      const err = error?.response?.data?.message;

      if (!err) {
        toast.error("Something went wrong, please try again later.");
      } else {
        toast.error(err);
      }
      throw error;
    }
  },
}));

export default userAuth;
