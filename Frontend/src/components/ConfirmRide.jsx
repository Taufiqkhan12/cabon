import { MapPin, MapPinLine, MoneyWavy } from "@phosphor-icons/react";
import UserStore from "../store/UserStore";

const ConfirmRide = () => {
  const {
    setVehiclePanelOpen,
    setConfirmRidePanel,
    pickup,
    destination,
    fare,
    vehicleType,
    createRide,
    loading,
    setLoading,
  } = UserStore();

  const handleCancelRidePanel = () => {
    setConfirmRidePanel(false);
    setVehiclePanelOpen(true);
  };

  const handleConfirmation = async () => {
    setLoading(true);
    try {
      await createRide();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full w-full md:mx-auto p-4 flex flex-col items-start justify-center gap-4">
      <img
        src={
          vehicleType === "car"
            ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            : vehicleType === "bike"
            ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
        }
        alt="image"
        className="w-2/3 md:w-1/3 xl:w-1/4 mx-auto object-cover"
      />
      <div className="flex w-full flex-col gap-4 lg:gap-6 mt-10 xl:mt-10 justify-center items-start">
        {/* Pick-up Address */}
        <div className="flex w-full items-center justify-start gap-2 border-b border-gray-200 p-2 xl:p-4">
          <MapPin size={24} />
          <h4 className="text-sm lg:text-base font-semibold ml-2">
            {pickup || "Could not fetch pickup address"}
          </h4>
        </div>
        {/* Destination Address */}
        <div className="flex w-full items-center justify-start gap-2 border-b border-gray-200 p-2 xl:p-4">
          <MapPinLine size={24} />
          <h4 className="text-sm lg:text-base font-semibold ml-2">
            {destination || "Could not fetch destination address"}
          </h4>
        </div>
        {/* Price for the ride */}
        <div className="flex items-center justify-start gap-2 border-b border-gray-200 p-2 w-full xl:p-4">
          <MoneyWavy size={24} />
          <h4 className="text-sm lg:text-base font-semibold ml-2">
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
      <div className="flex items-center justify-center w-full gap-4 lg:gap-10 xl:mt-6">
        <button
          className="bg-[#eeeeee] cursor-pointer w-full md:w-1/2 lg:w-1/3 xl:w-1/4 text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#eeeeee]/65  transition-all text-sm md:text-base"
          onClick={() => handleCancelRidePanel()}
        >
          Cancel
        </button>
        <button
          disabled={loading}
          className={`bg-black w-full ${
            loading ? "cursor-not-allowed bg-black/60" : "cursor-pointer"
          } md:w-1/2 text-sm lg:w-1/3 xl:w-1/4 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all md:text-base`}
          onClick={() => handleConfirmation()}
        >
          {loading ? "Confirming Ride..." : "Confirm Ride"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
