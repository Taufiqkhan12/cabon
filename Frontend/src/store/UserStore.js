import { create } from "zustand";
import axiosInstance from "../axios/axiosInstance";
const UserStore = create((set) => ({
  pickup: "",
  destination: "",
  pickupSuggestion: [],
  destinationSuggestion: [],
  activeField: null,

  setPickup: (state) => set({ pickup: state }),
  setDestination: (state) => set({ destination: state }),
  setPickupSuggestion: (state) => set({ pickupSuggestion: state }),
  setDestinationSuggestion: (state) => set({ destinationSuggestion: state }),
  setActiveField: (state) => set({ activeField: state }),

  handlePickupSuggestion: async (e) => {
    set({ pickup: e.target.value });

    try {
      const res = await axiosInstance.get(`/map/get-suggestions`, {
        params: { address: e.target.value },
        withCredentials: true,
      });

      if (res.data.data) set({ pickupSuggestion: res.data?.data?.suggestion });
    } catch (error) {
      console.log(error);
    }
  },

  handleDestinationSuggestion: async (e) => {
    set({ destination: e.target.value });
    try {
      const res = await axiosInstance.get(`/map/get-suggestions`, {
        params: { address: e.target.value },
        withCredentials: true,
      });

      if (res.data.data)
        set({ destinationSuggestion: res.data?.data?.suggestion });
    } catch (error) {
      console.log(error);
    }
  },

  getFare: async (pickup, destination) => {
    try {
      console.log(pickup, destination);
      const res = await axiosInstance.get("/ride/get-fare", {
        params: { pickup: pickup, destination: destination },
        withCredentials: true,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default UserStore;
