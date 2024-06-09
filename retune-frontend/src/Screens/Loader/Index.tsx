import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";

const Loading: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    console.log("Submitting: ", searchTerm); // Log the term being submitted
    try {
      const response = await axios.post(
        "https://retune.so/api/chat/11eee940-df2f-6cb0-bb38-d5792b1045ea/response",
        { threadId: "yourThreadId", input: searchTerm },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Workspace-API-Key": "11eee940-b39f-3bc0-b1e0-edab9493f797",
          },
          withCredentials: true,
        }
      );
      console.log("Response: ", response.data); // Log the response from the server
    } catch (error) {
      console.error("Error submitting: ", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white px-4 flex-col">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="w-full rounded-lg overflow-y-auto shadow-lg border-2 border-solid border-gray-400 py-2 mt-0 mb-6">
            <div className="px-6 py-4">
              <div className="font-bold text-lg mb-2 text-left">ANSWER:</div>

              <div className="space-y-2">
                <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
                <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
                <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
                <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-2xl absolute bottom-6">
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
  );
};

export default Loading;
