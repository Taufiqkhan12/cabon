import { User } from "@phosphor-icons/react";
import React from "react";
import UserStore from "../store/UserStore";

const BookingOptionCards = () => {
  const { setConfirmRidePanel, setVehiclePanelOpen, fare, setVehicleType } =
    UserStore();

  const handleRideClick = async (vehicletype) => {
    setVehiclePanelOpen(false);
    setConfirmRidePanel(true);
    setVehicleType(vehicletype);
  };

  const options = [
    {
      name: "UberGo",
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
      price: fare?.car || "Could not fetch fare",
      desc: "Affordable, compact rides",
      time: "2 mins away",
      space: 4,
      type: "car",
    },
    {
      name: "Moto",
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
      price: fare?.bike || "Could not fetch fare",
      desc: "Affordable motorcycle rides",
      time: "3 mins away",
      space: 1,
      type: "bike",
    },
    {
      name: "UberAuto",
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
      price: fare?.auto || "Could not fetch fare",
      desc: "Affordable auto-rickshaw rides",
      time: "2 mins away",
      space: 3,
      type: "auto",
    },
  ];
  return (
    <>
      {options.map((option, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 w-full md:w-3/4 xl:2/3 md:mx-auto gap-5 my-4 border-2 rounded-lg transition-all  border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:border-2 active:border-black overflow-clip active:rounded-lg cursor-pointer"
          onClick={() => handleRideClick(option.type)}
        >
          <div className="w-full flex items-center justify-start gap-5">
            <img
              src={option.image}
              alt="Image for Booking Option"
              className="w-1/4 md:w-1/6 object-cover"
            />
            <div className="desc-box font-medium text-xs lg:text-sm text-gray-700 flex flex-col items-start justify-start">
              <div className="flex items-center justify-center gap-5">
                <h2 className="font-semibold text-lg xl:text-xl">
                  {option.name}
                </h2>
                <div className="flex items-center gap-2 justify-center">
                  <User size={16} /> {option.space}
                </div>
              </div>
              <p className="">{option.time} mins away</p>
              <p className="">{option.desc}</p>
            </div>
          </div>
          {/* Price Tag  */}
          <div className="font-semibold text-lg">₹{option.price}</div>
        </div>
      ))}
    </>
  );
};

export default BookingOptionCards;
