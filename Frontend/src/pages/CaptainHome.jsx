/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import { CarProfile, Gauge, Timer } from "@phosphor-icons/react";
import RidePopUp from "../components/RidePopUp";
import HomeStore from "../store/HomeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import userAuth from "../store/UserAuth";
import { SocketContext } from "../socket/SocketProvider";

const CaptainHome = () => {
  const {
    ridePopUpPanel,
    setRidePopUpPanel,
    confirmRidePopUpPanel,
    setConfirmRidePopUpPanel,
  } = HomeStore();

  const { sendMessage, receiveMessage } = useContext(SocketContext);

  const { captainAuthData } = userAuth();
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);

  const [data, setData] = useState({});

  useEffect(() => {
    sendMessage("join", { userId: captainAuthData?._id, userType: "captain" });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          sendMessage("update-location-captain", {
            captainId: captainAuthData?._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 5000);
    updateLocation();
  }, []);

  receiveMessage("new-ride", (data) => {
    console.log(data);
    setData(data);
    setRidePopUpPanel(true);
  });

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopUpPanel]);
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
          className="h-1/2 w-full object-cover "
        />
        {/* Driver Details  */}
        <div className="h-1/2 w-full bg-white rounded-t-xl overflow-clip flex flex-col items-start justify-start gap-4 p-4">
          <div className="flex items-center justify-between w-full">
            <div
              className="w-full flex items-center justify-center
                  "
            >
              <div className="size-14 bg-gray-200 flex items-center justify-center rounded-full z-10">
                <img
                  src="https://media.istockphoto.com/id/1368412534/photo/smiling-taxi-driver-showing-empty-card-by-looking-at-camera-in-front-of-car-concept-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=2mKflXu7jzFxPGSGAT3nL-fOiEaIB6GFrS5crVODZI0="
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h2 className="font-medium text-lg ml-3">
                {captainAuthData?.fullname?.firstname +
                  " " +
                  captainAuthData?.fullname?.lastname}
              </h2>
            </div>
            {/* Driver Details  */}
            <div className="flex w-full flex-col items-end justify-center">
              {/* Name  */}
              <h3 className="font-bold text-xl mr-1">₹300.42</h3>
              <p className="text-white mt-1 p-1 px-6 text-xs bg-black rounded-md">
                Earned
              </p>
            </div>
          </div>

          {/* Driver Stats  */}

          <div className="w-full bg-gray-100 shadow py-10 mt-5 rounded-lg flex items-center justify-around p-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <Timer size={32} weight="bold" />
              <p className="text-sm font-bold">2.3 Hrs</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Gauge size={32} weight="bold" />
              <p className="text-sm font-bold">2.3 Hrs</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <CarProfile size={32} weight="bold" />
              <p className="text-sm font-bold">2.3 Hrs</p>
            </div>
          </div>
        </div>

        {/* Ride Pop up  */}
        <div
          className="fixed z-10 bottom-0 w-full bg-white translate-y-full"
          ref={ridePopUpPanelRef}
        >
          <h3 className="font-semibold text-xl text-center py-4">
            New Ride Available !
          </h3>
          <RidePopUp data={data} />
        </div>

        {/* Confirm Ride Pop up  */}
        <div
          className="fixed z-10 bottom-0 h-screen w-full bg-white translate-y-full py-4 px-2"
          ref={confirmRidePopUpPanelRef}
        >
          <h3 className="font-semibold text-xl text-center py-4 textwh">
            Confirm this ride to start !
          </h3>
          <ConfirmRidePopUp />
        </div>
      </div>
    </>
  );
};

export default CaptainHome;
