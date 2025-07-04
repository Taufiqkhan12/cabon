import React from "react";
import { MapPin, MapPinLine, MoneyWavy } from "@phosphor-icons/react";
import HomeStore from "../store/HomeStore";
import Home from "../pages/Home";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = () => {
  const { setConfirmRidePopUpPanel } = HomeStore();
  return (
    <>
      <div className="h-10/12 mt-2 w-full bg-gray-100 rounded-3xl shadow-lg rounded-t-2xl p-4 flex flex-col items-start justify-center gap-4">
        {/* Ride Pop Up Details  */}
        <div className="w-full flex items-center justify-between bg-black text-white rounded-md p-2">
          {/* User's Name and pfp  */}
          <div className="flex w-[70%] items-center justify-start gap-3">
            <div className="size-12 rounded-full overflow-clip flex items-center justify-center bg-gray-200">
              <img
                src="https://avatars.githubusercontent.com/u/123471875?v=4"
                alt="pfp"
                className="w-full h-full object-cover"
              />
            </div>
            {/* <img
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
                alt=""
                className="w-1/2 object-cover"
              /> */}
            <h2 className="font-semibold text-lg">Taufiq Khan</h2>
          </div>
          <div className="w-[30%] flex items-center justify-end">
            <p className="font-medium text-base">2.2 KM</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-5 justify-center items-start w-full">
          {/* Pick-up Address */}
          <div className="flex items-center justify-start gap-2 border-b border-gray-200 p-2">
            <MapPin size={24} />
            <h4 className="text-sm font-semibold ml-2">
              Khar West Station, Mumbai, Maharashtra 400052
            </h4>
          </div>
          {/* Destination Address */}
          <div className="flex items-center justify-start gap-2 border-b border-gray-200 p-2">
            <MapPinLine size={24} />
            <h4 className="text-sm font-semibold ml-2">
              Rizvi College of Engineering , Khar West, Mumbai, Maharashtra
              400052
            </h4>
          </div>
          {/* Price for the ride */}
          <div className="flex items-center justify-start gap-2 border-b border-gray-200 p-2 w-full">
            <MoneyWavy size={24} />
            <h4 className="text-sm font-semibold ml-2">₹300</h4>
          </div>
          {/* Payment Mode  */}
          <div className="flex items-center justify-start gap-2 border-b border-gray-200 p-2 w-full">
            <MoneyWavy size={24} />
            <h4 className="text-sm font-semibold ml-2">Cash</h4>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col w-full">
          <h3 className="text-sm font-semibold">
            Please enter OTP to start the ride
          </h3>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Buttons for further actions  */}
        <div className="flex items-center justify-center w-full gap-4 mt-3">
          <button
            className="bg-red-500 w-full text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            onClick={() => setConfirmRidePopUpPanel(false)}
          >
            {" "}
            Cancel
          </button>
          <Link
            to="/captain-riding"
            className="bg-green-500 w-full text-center text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all"
          >
            Start Ride
          </Link>
        </div>
      </div>
    </>
  );
};

export default ConfirmRidePopUp;
