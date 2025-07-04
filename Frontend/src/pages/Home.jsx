/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useContext, useEffect, useRef } from "react";
import HomeStore from "../store/HomeStore";
import LocationSearchPanel from "../components/LocationSearchPanel";
import BookingOptionCards from "../components/BookingOptionCards";
import { CaretDown } from "@phosphor-icons/react";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import UserStore from "../store/UserStore";
import { SocketContext } from "../socket/SocketProvider";
import userAuth from "../store/UserAuth";
const Home = () => {
  const { sendMessage, receiveMessage } = useContext(SocketContext);

  const { userAuthData } = userAuth();

  console.log(userAuthData?._id);

  useEffect(() => {
    sendMessage("join", {
      userType: "user",
      userId: userAuthData?._id,
    });
  }, []);
  const { register, handleSubmit } = useForm();

  const {
    panelOpen,
    setPanelOpen,
    vehiclePanelOpen,
    setVehiclePanelOpen,
    confirmRidePanel,
    // setConfirmRidePanel,
    lookingForDriverPanel,
    waitingForDriverPanel,
    // setLookingForDriverPanel,
    // setWaitingForDriverPanel,
    pickup,
    destination,
    setPickup,
    setDestination,
    handlePickupSuggestion,
    pickupSuggestion,
    destinationSuggestion,
    setPickupSuggestion,
    activeField,
    setActiveField,
    handleDestinationSuggestion,
    getFare,
  } = UserStore();

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translatey(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translatey(150%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (lookingForDriverPanel) {
      gsap.to(lookingForDriverPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(lookingForDriverPanelRef.current, {
        transform: "translatey(150%)",
      });
    }
  }, [lookingForDriverPanel]);

  useGSAP(() => {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverPanelRef.current, {
        transform: "translatey(150%)",
      });
    }
  }, [waitingForDriverPanel]);

  const formSubmit = (data) => {
    console.log(pickup, destination);
  };

  const handleCheckRides = async () => {
    await getFare(pickup, destination);
    setPanelOpen(false);
    // setVehiclePanelOpen(true);
  };

  return (
    // <div>{`Hii ${userAuthData?.fullname?.firstname}, Welcome to Uber !`}</div>
    <div className="h-screen relative">
      <img
        src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
        alt="Uber Logo"
        className="w-16 absolute left-5 top-5"
      />
      <div className="h-screen w-screen">
        {/* Map Image for temporary use   */}
        <img
          src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG"
          alt="Map image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="w-full h-screen absolute top-0 flex flex-col justify-end">
        {/* Input box for pick and drop  location  */}
        <div className="h-[30%] w-full relative bg-white p-4">
          <h4 className="font-semibold text-2xl font-sans">Find a Trip</h4>
          <CaretDown
            onClick={() => setPanelOpen(false)}
            size={24}
            className={`absolute right-5 top-5 ${panelOpen ? "" : "hidden"}`}
          />
          <form
            action=""
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit(formSubmit)}
          >
            <div className="line w-[2.5px] h-14 absolute top-[82px] left-[33px] bg-black"></div>
            <div className="circle rounded-full w-3 h-3 flex items-center justify-center bg-black top-[80px] left-7  absolute">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <input
              type="text"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              placeholder="Add a pick-up location"
              className="w-full px-12 py-2 rounded bg-[#eeeeee] text-base outline-0"
              {...register("pickuplocation")}
              onChange={handlePickupSuggestion}
              value={pickup}
            ></input>
            <div className="circle w-3 h-3 flex items-center justify-center bg-black top-[134px] left-7  absolute">
              <div className="w-1 h-1 bg-white"></div>
            </div>
            <input
              type="text"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              placeholder="Add a destination location"
              className="w-full px-12 py-2 rounded bg-[#eeeeee] text-base outline-0"
              {...register("destinationlocation")}
              onChange={handleDestinationSuggestion}
              value={destination}
            />
            {pickup && destination && (
              <button
                onClick={handleCheckRides}
                className="bg-black w-full text-white px-4 py-2 rounded "
              >
                Check Rides
              </button>
            )}
          </form>
        </div>
        <div ref={panelRef} className={`bg-white ${panelOpen ? "" : "h-0"}`}>
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestion
                : destinationSuggestion
            }
          />
        </div>
      </div>
      {/* Vehicle Panel Ref  */}
      <div
        className="fixed z-10 bottom-0 w-full bg-white px-2 translate-y-full"
        ref={vehiclePanelRef}
      >
        <h3 className="font-semibold text-xl p-4">Choose a vehicle</h3>
        <CaretDown
          onClick={() => setVehiclePanelOpen(false)}
          size={24}
          className={`absolute right-5 top-5 ${
            vehiclePanelOpen ? "" : "hidden"
          }`}
        />

        <BookingOptionCards />
      </div>

      {/* Confirm Ride Panel */}
      <div
        className="fixed z-10 bottom-0 w-full bg-white px-2 translate-y-[150%]"
        ref={confirmRidePanelRef}
      >
        <h3 className="font-semibold text-xl p-4">Confirm Your Ride</h3>

        <ConfirmRide />
      </div>

      {/* Looking for Ride Panel */}
      <div
        className="fixed z-10 bottom-0 w-full bg-white translate-y-[150%]"
        ref={lookingForDriverPanelRef}
      >
        <h3 className="font-semibold text-xl text-center p-4">
          Looking for Driver
        </h3>

        <LookingForDriver />
      </div>

      {/* Waiting for Ride Panel */}
      <div
        className="fixed z-10 bottom-0 w-full bg-white translate-y-[0%]"
        ref={waitingForDriverPanelRef}
      >
        {/* <h3 className="font-semibold text-xl text-center p-4">
          Looking for Driver
        </h3> */}

        <WaitingForDriver />
      </div>
    </div>
  );
};

export default Home;
