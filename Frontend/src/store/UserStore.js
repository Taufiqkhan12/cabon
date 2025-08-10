import { create } from "zustand";
import axiosInstance from "../axios/axiosInstance";
import { debounce } from "../utils/debounce";
const UserStore = create((set) => ({
  // States for managing's users home page
  panelOpen: false,
  vehiclePanelOpen: false,
  confirmRidePanel: false,
  lookingForDriverPanel: false,
  waitingForDriverPanel: false,
  rideDetails: {},
  loading: false,
  loadingText: false,

  setPanelOpen: (state) => set({ panelOpen: state }),
  setVehiclePanelOpen: (state) => set({ vehiclePanelOpen: state }),
  setConfirmRidePanel: (state) => set({ confirmRidePanel: state }),
  setLookingForDriverPanel: (state) => set({ lookingForDriverPanel: state }),
  setWaitingForDriverPanel: (state) => set({ waitingForDriverPanel: state }),
  setRideDetails: (data) => set({ rideDetails: data }),
  setLoading: (state) => set({ loading: state }),
  setLoadingText: (state) => set({ loadingText: state }),

  //  States for managing user's ride details
  pickup: null,
  destination: null,
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

  handlePickupSuggestion: debounce(async function (e) {
    try {
      const res = await axiosInstance.get(`/map/get-suggestions`, {
        params: { address: e.target.value },
        withCredentials: true,
      });

      if (res.data.data) {
        set({ loadingText: false });
        set({ pickupSuggestion: res.data?.data?.suggestion });
      }
    } catch (error) {
      console.log(error);
    }
  }, 1000),

  handleDestinationSuggestion: debounce(async (e) => {
    try {
      const res = await axiosInstance.get(`/map/get-suggestions`, {
        params: { address: e.target.value },
        withCredentials: true,
      });

      if (res.data.data) {
        set({ loadingText: false });
        set({ destinationSuggestion: res.data?.data?.suggestion });
      }
    } catch (error) {
      console.log(error);
    }
  }, 1000),

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

      if (res.data) {
        set({ lookingForDriverPanel: true });
        set({ confirmRidePanel: false });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default UserStore;
