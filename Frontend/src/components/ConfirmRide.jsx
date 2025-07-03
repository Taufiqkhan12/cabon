import { MapPin, MapPinLine, MoneyWavy } from "@phosphor-icons/react";
import React from "react";
import HomeStore from "../store/HomeStore";

const ConfirmRide = () => {
  const { setVehiclePanelOpen, setConfirmRidePanel, setLookingForDriverPanel } =
    HomeStore();
  const handleConfirmRidePanel = () => {
    setConfirmRidePanel(false);
    setVehiclePanelOpen(true);
  };

  const handleConfirmation = () => {
    setConfirmRidePanel(false);
    setLookingForDriverPanel(true);
  };
  return (
    <div className="h-full w-full bg-white p-4 flex flex-col items-start justify-center gap-4">
      <img
        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
        alt=""
        className="w-2/3 mx-auto object-cover"
      />
      <div className="flex flex-col gap-4 mt-10 justify-center items-start w-full">
        {/* Pick-up Address */}
        <div className="flex items-center justify-start gap-2 border-b border-gray-200 p-2">
          <MapPin size={24} />
          <h4 className="text-sm font-semibold ml-2">
            24B, Sector 18, St. Xaviers High School, Noida
          </h4>
        </div>
        {/* Destination Address */}
        <div className="flex items-center justify-start gap-2 border-b border-gray-200 p-2">
          <MapPinLine size={24} />
          <h4 className="text-sm font-semibold ml-2">
            24B, Sector 18, St. Xaviers High School, Noida
          </h4>
        </div>
        {/* Price for the ride */}
        <div className="flex items-center justify-start gap-2 border-b border-gray-200 p-2 w-full">
          <MoneyWavy size={24} />
          <h4 className="text-sm font-semibold ml-2">₹300</h4>
        </div>
      </div>
      {/* Buttons for further actions  */}
      <div className="flex items-center justify-center w-full gap-4">
        <button
          className="bg-[#eeeeee] w-full text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all"
          onClick={() => handleConfirmRidePanel()}
        >
          {" "}
          Cancel
        </button>
        <button
          className="bg-black w-full text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all"
          onClick={() => handleConfirmation()}
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
