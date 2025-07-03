import React from "react";
import HomeStore from "../store/HomeStore";
import { MapPin } from "@phosphor-icons/react";
import UserStore from "../store/UserStore";
const LocationSearchPanel = ({ suggestions }) => {
  //   console.log(panelOpen);
  const { panelOpen } = HomeStore();
  const { setPickup, setDestination, activeField } = UserStore();

  // const handleLocationClick = () => {
  //   setPanelOpen(false), setVehiclePanelOpen(true);
  // };

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
  };

  return (
    <div className="w-full mt-4">
      <div className={`${panelOpen ? "" : "hidden"}`}>
        {/* Sample Data */}
        <div className="w-full flex flex-col items-center justify-center p-2">
          {suggestions?.map((location, index) => (
            <div
              key={index}
              className="flex items-center w-full justify-center p-4 gap-2 mt-2 border-2 border-gray-200 rounded-lg active:border-black"
              onClick={() => handleSuggestionClick(location.description)}
            >
              <h2 className="w-10 h-10 bg-[#eeeeee] rounded-xl flex items-center justify-center">
                <MapPin size={24} />
              </h2>
              <h4 className="text-sm w-full font-semibold ml-2">
                {location?.description}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSearchPanel;
