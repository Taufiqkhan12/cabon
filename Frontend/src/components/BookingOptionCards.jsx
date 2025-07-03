import { User } from "@phosphor-icons/react";
import React from "react";
import HomeStore from "../store/HomeStore";

const BookingOptionCards = () => {
  const { setConfirmRidePanel, setVehiclePanelOpen } = HomeStore();

  const handleRideClick = () => {
    setVehiclePanelOpen(false);
    // Open the confirm ride panel
    setConfirmRidePanel(true);
  };

  const options = [
    {
      name: "UberGo",
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
      price: 300,
      desc: "Affordable, compact rides",
      time: "2 mins away",
      space: 4,
    },
    {
      name: "Moto",
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
      price: 65.33,
      desc: "Affordable motorcycle rides",
      time: "3 mins away",
      space: 1,
    },
    {
      name: "UberAuto",
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
      price: 139,
      desc: "Affordable auto-rickshaw rides",
      time: "2 mins away",
      space: 3,
    },
  ];
  return (
    <>
      {options.map((option, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 w-full gap-5 my-4 border-2 rounded-lg transition-all  border-gray-200 active:border-2 active:border-black overflow-clip active:rounded-lg cursor-pointer"
          onClick={() => handleRideClick()}
        >
          <div className="w-full flex items-center justify-start gap-5">
            <img
              src={option.image}
              alt="Image for Booking Option"
              className="w-1/4 object-cover"
            />
            <div className="desc-box font-medium text-xs flex flex-col items-start justify-start">
              <div className="flex items-center justify-center gap-5">
                <h2 className="font-semibold text-lg">{option.name}</h2>
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
