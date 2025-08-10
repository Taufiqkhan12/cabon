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
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
const Home = () => {
  const { sendMessage, receiveMessage } = useContext(SocketContext);
  const { userAuthData } = userAuth();
  const { register, handleSubmit, reset } = useForm();

  const {
    panelOpen,
    setPanelOpen,
    vehiclePanelOpen,
    setVehiclePanelOpen,
    confirmRidePanel,
    lookingForDriverPanel,
    waitingForDriverPanel,
    setLookingForDriverPanel,
    setWaitingForDriverPanel,
    pickup,
    setPickup,
    destination,
    setDestination,
    handlePickupSuggestion,
    pickupSuggestion,
    destinationSuggestion,
    activeField,
    setActiveField,
    handleDestinationSuggestion,
    getFare,
    setRideDetails,
    loading,
    setLoading,
    setLoadingText,
  } = UserStore();

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    sendMessage("join", {
      userType: "user",
      userId: userAuthData?._id,
    });
  }, []);

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
        transform: "translatey(150%)",
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
        transform: "translatey(200%)",
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
    reset();
  };

  const handleCheckRides = async () => {
    setLoading(true);
    try {
      await getFare(pickup, destination);
      setPanelOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  receiveMessage("ride-confirmed", (data) => {
    setLookingForDriverPanel(false);
    setWaitingForDriverPanel(true);
    if (data) {
      setRideDetails(data);
    }
  });

  receiveMessage("ride-started", (data) => {
    setWaitingForDriverPanel(false);
    navigate("/riding");
  });

  const isEnabled = pickup && destination;

  return (
    <>
      <div className="h-screen relative">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="Uber Logo"
          className="w-16 absolute left-5 top-5"
        />
        <div className="h-[65%] w-full absolute top-0 cursor-pointer">
          <LiveTracking />
        </div>

        <div className="w-full h-full top-0 flex flex-col justify-end">
          {/* Input box for pick and drop  location  */}
          <div className="h-[35%] w-full relative bg-white p-4 rounded-t-2xl shadow-2xl">
            <h4 className="font-semibold text-xl xl:text-3xl p-2 xl:p-1">
              Find a Trip
            </h4>
            <CaretDown
              onClick={() => setPanelOpen(false)}
              size={24}
              className={`absolute right-5 cursor-pointer top-5 ${
                panelOpen ? "" : "hidden"
              }`}
            />
            <form
              action=""
              className="flex flex-col md:items-center md:justify-center gap-4 mt-4"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="line w-[2.5px] h-14 absolute top-[102px] left-[33px] md:left-[8.3rem] lg:left-[10.28rem] xl:left-[17.8rem] bg-black"></div>
              <div className="circle rounded-full w-3 h-3 flex items-center justify-center bg-black top-[92px] left-7 md:left-32 lg:left-40 xl:left-70 absolute">
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
              <input
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                placeholder="Add a pick-up location"
                className="w-full md:w-3/4 xl:w-2/3 px-12 py-2 cursor-pointer rounded bg-[#eeeeee] text-base outline-0"
                {...register("pickuplocation")}
                onChange={(e) => {
                  setLoadingText(true);
                  setPickup(e.target.value);
                  handlePickupSuggestion(e);
                }}
                value={pickup || ""}
              ></input>
              <div className="circle w-3 h-3 flex items-center justify-center bg-black top-[146px] left-7 md:left-32 lg:left-40 xl:left-70  absolute">
                <div className="w-1 h-1 bg-white"></div>
              </div>
              <input
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                placeholder="Add a destination location"
                className="w-full md:w-3/4 xl:w-2/3 px-12 py-2 cursor-pointer rounded bg-[#eeeeee] text-base outline-0"
                {...register("destinationlocation")}
                onChange={(e) => {
                  setLoadingText(true);
                  setDestination(e.target.value);
                  handleDestinationSuggestion(e);
                }}
                value={destination || ""}
              />

              <button
                disabled={!isEnabled}
                onClick={handleCheckRides}
                className={`w-full md:w-3/4 xl:w-2/3 text-white px-4 py-2 rounded ${
                  pickup && destination
                    ? "cursor-pointer bg-black"
                    : "cursor-not-allowed bg-black/50"
                }`}
              >
                {loading ? "Checking Rides..." : "Check Rides"}
              </button>
            </form>
          </div>
          <div
            ref={panelRef}
            className={`bg-white overflow-y-hidden ${
              panelOpen ? "z-10" : "h-0"
            }`}
          >
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
          className="fixed z-10 bottom-0 w-full rounded-t-2xl shadow-2xl bg-white px-2 translate-y-full"
          ref={vehiclePanelRef}
        >
          <h3 className="font-semibold text-xl xl:text-3xl p-4">
            Choose a vehicle
          </h3>
          <CaretDown
            onClick={() => setVehiclePanelOpen(false)}
            size={24}
            className={`absolute right-5 cursor-pointer top-5 ${
              vehiclePanelOpen ? "" : "hidden"
            }`}
          />

          <BookingOptionCards />
        </div>

        {/* Confirm Ride Panel */}
        <div
          className="fixed z-10 bottom-0 w-full bg-white rounded-t-2xl shadow-2xl px-2 translate-y-[150%]"
          ref={confirmRidePanelRef}
        >
          <h3 className="font-semibold text-xl xl:text-3xl p-4">
            Confirm Your Ride
          </h3>

          <ConfirmRide />
        </div>

        {/* Looking for Ride Panel */}
        <div
          className="fixed z-10 bottom-0 w-full bg-white translate-y-[150%]"
          ref={lookingForDriverPanelRef}
        >
          <h3 className="font-semibold text-xl xl:text-3xl p-4 text-center md:my-4">
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
    </>
  );
};

export default Home;
