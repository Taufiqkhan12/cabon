import { create } from "zustand";
import axiosInstance from "../axios/axiosInstance";
const UserStore = create((set) => ({
  // States for managing's users home page
  panelOpen: false,
  vehiclePanelOpen: false,
  confirmRidePanel: false,
  lookingForDriverPanel: false,
  waitingForDriverPanel: false,

  setPanelOpen: (state) => set({ panelOpen: state }),
  setVehiclePanelOpen: (state) => set({ vehiclePanelOpen: state }),
  setConfirmRidePanel: (state) => set({ confirmRidePanel: state }),
  setLookingForDriverPanel: (state) => set({ lookingForDriverPanel: state }),
  setWaitingForDriverPanel: (state) => set({ waitingForDriverPanel: state }),

  //  States for managing user's ride details
  pickup: "",
  destination: "",
  pickupSuggestion: [],
  destinationSuggestion: [],
  activeField: null,
  fare: {},
  vehicleType: "",

  setPickup: (state) => set({ pickup: state }),
  setDestination: (state) => set({ destination: state }),
  setPickupSuggestion: (state) => set({ pickupSuggestion: state }),
  setDestinationSuggestion: (state) => set({ destinationSuggestion: state }),
  setActiveField: (state) => set({ activeField: state }),
  setVehicleType: (state) => set({ vehicleType: state }),

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

  // Function to get fare based on pickup and destination
  getFare: async (pickup, destination) => {
    try {
      const res = await axiosInstance.get("/ride/get-fare", {
        params: { pickup: pickup, destination: destination },
        withCredentials: true,
      });

      if (res.data?.data?.fare) {
        set({ vehiclePanelOpen: true });
      }
      set({ fare: res.data?.data?.fare });
    } catch (error) {
      console.log(error);
    }
  },

  // Function to create a ride

  createRide: async () => {
    try {
      const res = await axiosInstance.post(
        "/ride/create",
        {
          pickup: UserStore.getState().pickup,
          destination: UserStore.getState().destination,
          vehicletype: UserStore.getState().vehicleType,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res);
      if (res.data) {
        set({ lookingForDriverPanel: true });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default UserStore;
