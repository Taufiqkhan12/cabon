/* eslint-disable no-unused-vars */
import { create } from "zustand";
import axiosInstance from "../axios/axiosInstance";

const userAuth = create((set) => ({
  userLogin: async (data) => {
    try {
      const res = await axiosInstance.post("/user/login", data, {
        withCredentials: true,
      });
      console.log(res.data.data.loggedInUser.resetToken);
      console.log(res.data);
      const accessToken = res?.data?.data?.loggedInUser?.resetToken;
      localStorage.setItem("token", accessToken);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));

export default userAuth;
