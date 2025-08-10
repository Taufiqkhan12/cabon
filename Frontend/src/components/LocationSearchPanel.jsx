import React from "react";
import HomeStore from "../store/HomeStore";
import { MapPin } from "@phosphor-icons/react";
import UserStore from "../store/UserStore";
const LocationSearchPanel = ({ suggestions }) => {
  const { panelOpen, setPickup, setDestination, activeField, loadingText } =
    UserStore();

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
        {/*  Data */}
        <div className="w-full md:w-3/4 xl:w-2/3 md:mx-auto flex flex-col items-center justify-center p-2">
          {suggestions.length && !loadingText
            ? suggestions?.map((location, index) => (
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
              ))
            : null}
          {!suggestions.length && !loadingText && (
            <div className="mt-10 text-gray-500">
              Enter the location to get the suggestions.
            </div>
          )}
          {loadingText && "Loading the suggestions please wait..."}
        </div>
      </div>
    </div>
  );
};

export default LocationSearchPanel;
