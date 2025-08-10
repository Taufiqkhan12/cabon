import { MapPin, MapPinLine, MoneyWavy } from "@phosphor-icons/react";
import UserStore from "../store/UserStore";
import { useContext } from "react";
import { SocketContext } from "../socket/SocketProvider";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const { rideDetails } = UserStore();
  const { receiveMessage } = useContext(SocketContext);
  const navigate = useNavigate();

  receiveMessage("ride-ended", (data) => {
    navigate("/home");
  });
  return (
    <>
      <div className="h-screen relative">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="Uber Logo"
          className="w-16 absolute left-5 top-5"
        />
        {/* Map Image for temporary use   */}
        {/* <img
          src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG"
          alt="Map image"
          className="h-1/2 w-full object-cover"
        /> */}
        <LiveTracking />
        {/* Ride Details after booking */}
        <div className="h-1/2 w-full bg-white p-4 flex flex-col items-start justify-center gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="w-full flex items-center justify-start">
              <div className="size-16 bg-gray-200 flex items-center justify-center rounded-full z-10">
                <img
                  src="https://media.istockphoto.com/id/1368412534/photo/smiling-taxi-driver-showing-empty-card-by-looking-at-camera-in-front-of-car-concept-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=2mKflXu7jzFxPGSGAT3nL-fOiEaIB6GFrS5crVODZI0="
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <img
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
                alt=""
                className="w-1/2 object-cover -ml-5"
              />
            </div>
            {/* Driver Details  */}
            <div className="flex w-full mt-2 flex-col items-end justify-center">
              {/* Name  */}
              <h2 className="font-medium text-lg">
                {(rideDetails?.captain?.fullname?.firstname || "") +
                  " " +
                  (rideDetails?.captain?.fullname?.lastname || "") ||
                  "Could not fetch driver's name"}
              </h2>
              <h3 className="font-bold">
                {rideDetails?.captain?.vehicle?.plate ||
                  "Could not fetch plate number"}
              </h3>
              <p className="text-gray-600 text-xs ">
                {rideDetails?.captain?.vehicle?.color &&
                rideDetails?.captain?.vehicle?.vehicleType
                  ? `${rideDetails?.captain?.vehicle?.color} ${rideDetails?.captain?.vehicle?.vehicleType}`
                  : "Could not fetch vehicle type"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-2 justify-center items-start w-full">
            {/* Pick-up Address */}
            <div className="flex w-full items-center justify-start gap-2 border-b border-gray-200 p-2">
              <MapPin size={24} />
              <h4 className="text-sm font-semibold ml-2">
                {rideDetails?.pickup
                  ? rideDetails.pickup.length > 40
                    ? rideDetails.pickup.slice(0, 40) + "..."
                    : rideDetails.pickup
                  : "Could not fetch pickup address"}
              </h4>
            </div>
            {/* Destination Address */}
            <div className="flex w-full items-center justify-start gap-2 border-b border-gray-200 p-2">
              <MapPinLine size={24} />
              <h4 className="text-sm font-semibold ml-2">
                {rideDetails?.destination
                  ? rideDetails.destination.length > 40
                    ? rideDetails.destination.slice(0, 40) + "..."
                    : rideDetails.destination
                  : "Could not fetch destination address"}
              </h4>
            </div>
            {/* Price for the ride */}
            <div className="flex items-center justify-start gap-2 border-b border-gray-200 p-2 w-full">
              <MoneyWavy size={24} />
              <h4 className="text-sm font-semibold ml-2">
                {rideDetails?.fare !== undefined && rideDetails?.fare !== null
                  ? `₹${rideDetails.fare}`
                  : "Could not fetch fare"}
              </h4>
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
            {/* <button className="bg-black w-full text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all">
                    Confirm Ride
                    </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Riding;
