import { create } from "zustand";
const HomeStore = create((set) => ({
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

  //  States for managing captain's home page
  ridePopUpPanel: true,
  confirmRidePopUpPanel: false,
  setRidePopUpPanel: (state) => set({ ridePopUpPanel: state }),
  setConfirmRidePopUpPanel: (state) => set({ confirmRidePopUpPanel: state }),
}));

export default HomeStore;
