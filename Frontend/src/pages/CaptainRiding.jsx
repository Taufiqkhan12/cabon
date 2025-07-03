import React from "react";
import { MapPin, MapPinLine, MoneyWavy } from "@phosphor-icons/react";

const CaptainRiding = () => {
  return (
    <>
      <div className="h-screen relative">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="Uber Logo"
          className="w-16 absolute left-5 top-5"
        />
        {/* Map Image for temporary use   */}
        <img
          src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG"
          alt="Map image"
          className="h-1/2 w-full object-cover"
        />
        {/* Ride Details after booking */}
        <div className="h-1/2 w-full bg-white p-4 flex flex-col items-start justify-center gap-4">
          <div className="flex flex-col gap-4 justify-center items-start w-full">
            <div className="w-full flex items-center justify-between bg-black mt-4 text-white rounded-md p-2">
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
            {/* <button
                      className="bg-red-500 w-11/12 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all"
                      // onClick={() => handleConfirmRidePanel()}
                    >
                      {" "}
                      Cancel
                    </button> */}
            <button className="bg-green-500 mb-2 w-full text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all">
              Finish Ride
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptainRiding;
