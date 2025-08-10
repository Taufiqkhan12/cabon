import React from "react";
import { NavLink } from "react-router-dom";

const Start = () => {
  return (
    <div className="">
      <div className="bg-cover w-full bg-bottom bg-[url(https://images.unsplash.com/photo-1518430272387-254558840136?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fic3xlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8 flex justify-between flex-col ">
        <img
          src="https://imgs.search.brave.com/q0RpOP4Xrts5ZePV9tj0DUW7OsKkNhfzYHmyy7y19IY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dC5icmFuZGZldGNo/LmlvL2lkaWROYmlp/T2QvaWR6dFRmTUI1/ai5zdmc_dXBkYXRl/ZD0xNjY4MDcxMDM2/NDY5"
          alt="image"
          className="w-16 ml-8"
        />
        <div className="bg-[#252525] rounded-t-2xl text-white py-5 px-3">
          <h2
            className="text-2xl font-bold
          "
          >
            Get Started with Cabon
          </h2>
          <NavLink
            to="/login"
            className="w-full flex items-center justify-center  bg-white font-semibold text-black py-3 rounded-lg mt-5"
          >
            Continue
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Start;
