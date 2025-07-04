import { create } from "zustand";
const HomeStore = create((set) => ({
  //  States for managing captain's home page
  ridePopUpPanel: false,
  confirmRidePopUpPanel: false,
  setRidePopUpPanel: (state) => set({ ridePopUpPanel: state }),
  setConfirmRidePopUpPanel: (state) => set({ confirmRidePopUpPanel: state }),
}));

export default HomeStore;
