import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";

const ResponseContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {};

  return (
    <div className="flex items-end justify-center min-h-screen bg-white px-4 overflow-y-auto">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center flex-col gap-5 mt-4 mb-0">
            <div className="w-full flex flex-row gap-2">
              <div className="font-bold text-lg mb-2 text-left">QUESTION:</div>
              <p className="text-gray-700 text-base text-left leading-loose">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="w-full rounded-lg overflow-y-auto shadow-lg border-2 border-solid border-gray-400 py-2 mt-0 mb-6">
              <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2 text-left">ANSWER:</div>
                <p className="text-gray-700 text-base text-left">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil.
                </p>
              </div>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Ask anything"
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className=" w-full py-3 pl-4 pr-20 text-lg text-gray-700 bg-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 shadow-[2px_2px_38px_0px_rgba(0,0,0,0.25),0px_-2px_4px_0px_rgba(0,0,0,0.25)_inset,1px_2px_4px_0px_rgba(0,0,0,0.25)_inset]"
              />
              <button className="absolute end-0 mt-[-47px] mr-1 flex justify-end items-center w-15 h-15 bg-[#333333] text-white text-lg font-bold p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <FaArrowRight onClick={handleSearch} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseContainer;
