import React from "react";
import InputFile from "./InputFile";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { IoPartlySunny } from "react-icons/io5";


function HeroSec() {
  return (
    <div className="flex items-center justify-center">

    <div className=" w-fit ml-28 mr-28 h-fit border-l-2 border-r-2 border-b-2 relative">
      {/* Content */}
      <div className="flex justify-around items-center">
        <div>
          <h1 className="font-bold text-5xl block p-3 mt-8 w-[189%]">
            <div className="mb-6">Accurate Weather Updates</div>
            <div>for Your Location, Anytime!</div>
          </h1>
        </div>
        <div>
          <p className="mt-[55px] float-right w-[40%] border-b-2 font-Parkinsans">
            Stay informed with real-time weather updates tailored to your location. Get precise forecasts to plan your day with confidence!
          </p>
        </div>
      </div>

      {/* Input Section */}
      <InputFile />

      {/* Down Arrow Icon */}
      <div
        className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2"
        style={{ position: "absolute", bottom: "-20px" }}
        >
        <FaRegArrowAltCircleDown className="text-gray-500 text-4xl" />
      </div>
    </div>
          </div>
  );
}

export default HeroSec;
