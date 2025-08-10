import { create } from "zustand";
import axiosInstance from "../axios/axiosInstance";
const HomeStore = create((set) => ({
  //  States for managing captain's home page
  ridePopUpPanel: false,
  confirmRidePopUpPanel: false,
  setRidePopUpPanel: (state) => set({ ridePopUpPanel: state }),
  setConfirmRidePopUpPanel: (state) => set({ confirmRidePopUpPanel: state }),

  rideData: {},
  setRideData: (data) => set({ rideData: data }),

  confirmRide: async (rideId) => {
    try {
      const res = await axiosInstance.post(
        "/ride/confirm",
        {
          rideId,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data) {
        set({ confirmRidePopUpPanel: true });
        set({ ridePopUpPanel: false });
      }
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  },

  startRide: async (rideId, otp, navigate) => {
    try {
      const res = await axiosInstance.post(
        "/ride/start-ride",
        {
          rideId: rideId,
          otp: otp,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data) {
        set({ confirmRidePopUpPanel: false });
        navigate("/captain-riding");
      }
    } catch (error) {
      console.log(error);
    }
  },

  finishRide: async (rideId, navigate) => {
    try {
      const res = await axiosInstance.post(
        "/ride/end-ride",
        {
          rideId: rideId,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data) {
        navigate("/captain-home");
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default HomeStore;
