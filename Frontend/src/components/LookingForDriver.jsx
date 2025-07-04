import React from "react";
import { MapPin, MapPinLine, MoneyWavy } from "@phosphor-icons/react";
import UserStore from "../store/UserStore";

const LookingForDriver = () => {
  const {
    setVehiclePanelOpen,
    setConfirmRidePanel,
    pickup,
    destination,
    fare,
    vehicleType,
  } = UserStore();
  const handleConfirmRidePanel = () => {
    setConfirmRidePanel(false);
    setVehiclePanelOpen(true);
  };
  return (
    <>
      <div className="relative w-full h-1 bg-gray-200 overflow-hidden">
        <div
          className="absolute h-full w-1/3 bg-green-500"
          style={{
            animation: "loader 3s linear infinite",
            position: "absolute",
            left: 0,
          }}
        />
        <style>
          {`
          @keyframes loader {
            0% { left: -33%;
             }
            50%{
            left : 100%
            }
            100% { left: -33%;
             }
          }
        `}
        </style>
      </div>
      <div className="h-full w-full bg-white p-4 flex flex-col items-start justify-center gap-4">
        <img
          src={
            vehicleType === "car"
              ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
              : vehicleType === "bike"
              ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          }
          alt="Image of the vehicle"
          className="w-2/3 mx-auto object-cover"
        />
        <div className="flex flex-col gap-4 mt-10 justify-center items-start w-full">
          {/* Pick-up Address */}
          <div className="flex items-center justify-start gap-2 border-b border-gray-200 p-2">
            <MapPin size={24} />
            <h4 className="text-sm font-semibold ml-2">
              {pickup || "Could not fetch pickup address"}
            </h4>
          </div>
          {/* Destination Address */}
          <div className="flex items-center justify-start gap-2 border-b border-gray-200 p-2">
            <MapPinLine size={24} />
            <h4 className="text-sm font-semibold ml-2">
              {destination || "Could not fetch destination address"}
            </h4>
          </div>
          {/* Price for the ride */}
          <div className="flex items-center justify-start gap-2 border-b border-gray-200 p-2 w-full">
            <MoneyWavy size={24} />
            <h4 className="text-sm font-semibold ml-2">
              ₹
              {vehicleType === "car"
                ? fare?.car
                : vehicleType === "bike"
                ? fare?.bike
                : fare?.auto}
            </h4>
          </div>
        </div>
        {/* Buttons for further actions  */}
        <div className="flex items-center justify-center w-full gap-4">
          <button
            className="bg-red-500 w-11/12 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            onClick={() => handleConfirmRidePanel()}
          >
            {" "}
            Cancel
          </button>
          {/* <button className="bg-black w-full text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all">
          Confirm Ride
          </button> */}
        </div>
      </div>
    </>
  );
};

export default LookingForDriver;
