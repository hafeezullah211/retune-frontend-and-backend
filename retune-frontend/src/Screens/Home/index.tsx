import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Conversation {
  prompt: string;
  response: string;
}

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [threadId, setThreadId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);
  const [typedResponse, setTypedResponse] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    console.log("Submitting: ", searchTerm);
    if (!threadId) {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3001/api/new-thread",
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const newThreadId = response.data.threadId;
        setThreadId(newThreadId);
        console.log("New Thread ID: ", newThreadId);
        await continueConversation(newThreadId, searchTerm);
      } catch (error) {
        console.error("Error creating thread: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      await continueConversation(threadId, searchTerm);
    }
    setSearchTerm(""); // Clear the input field immediately after submission
    setHasSearched(true);
  };

  const continueConversation = async (threadId: string, input: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/api/response",
        { threadId: threadId, input: input },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Prompt: ", input);
      console.log("Response: ", response.data);

      const responseData = response.data.response.value;

      setConversations((prevConversations) => [
        ...prevConversations,
        { prompt: input, response: responseData },
      ]);

      setCurrentResponse(responseData);
      setTypedResponse(""); // Reset typed response
    } catch (error) {
      console.error("Error continuing conversation: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentResponse) {
      let index = 0;
      const interval = setInterval(() => {
        setTypedResponse((prev) => prev + (currentResponse[index] || ""));
        index += 1;
        if (index >= currentResponse.length) {
          clearInterval(interval);
        }
      }, 10);
      return () => clearInterval(interval);
    }
  }, [currentResponse]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-2xl">
        {!hasSearched ? (
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-black mb-5 bg-custom-gradient">
              Search smarter & faster
            </h1>
            <div className="flex justify-center items-center">
              <input
                type="text"
                value={searchTerm}
                placeholder="Ask anything"
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full py-3 pl-4 pr-20 text-lg text-gray-700 bg-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 shadow-[2px_2px_38px_0px_rgba(0,0,0,0.25),0px_-2px_4px_0px_rgba(0,0,0,0.25)_inset,1px_2px_4px_0px_rgba(0,0,0,0.25)_inset]"
              />
              <button
                onClick={handleSearch}
                className="flex justify-center items-center w-15 h-15 ml-[-47px] bg-[#333333] text-white text-lg font-bold p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaArrowRight />
              </button>
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 z-1000">
                Powered by Together AI
              </div>
            </div>
            <div className="flex justify-center space-x-2 mt-6">
              <span
                onClick={() =>
                  handleInputChange({
                    target: { value: "How does photosynthesis work?" },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                className="cursor-pointer text-black px-4 py-1 text-sm w-1/2 flex justify-center items-center rounded-lg border border-solid border-[#C1C1C1] bg-[#EDEDEA]"
              >
                How does photosynthesis work?
              </span>
              <span
                onClick={() =>
                  handleInputChange({
                    target: { value: "How can I get a 6 pack in 3 months?" },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                className="cursor-pointer text-black px-4 py-1 text-sm w-1/2 flex justify-center items-center rounded-lg border border-solid border-[#C1C1C1] bg-[#EDEDEA]"
              >
                How can I get a 6 pack in 3 months?
              </span>
              <span
                onClick={() =>
                  handleInputChange({
                    target: {
                      value: "Can you explain the theory of relativity?",
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                className="cursor-pointer text-black px-4 py-1 text-sm w-1/2 flex justify-center items-center rounded-lg border border-solid border-[#C1C1C1] bg-[#EDEDEA]"
              >
                Can you explain the theory of relativity?
              </span>
            </div>
            <div className="mt-6 text-gray-400">
              <a href="https://github.com" className="hover:underline">
                Fully open source. Star it on github.
              </a>
            </div>
            {loading && (
              <div className="w-full rounded-lg overflow-y-auto shadow-lg border-2 border-solid border-gray-400 py-2 mt-6 mb-6">
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
            )}
          </div>
        ) : (
          <div className="text-center mb-12">
            {conversations.map((conversation, index) => (
              <div
                key={index}
                className="flex justify-center items-center flex-col gap-5 mt-4 mb-0"
              >
                <div className="w-full flex flex-row gap-2">
                  <div className="font-bold text-lg mb-2 text-left">
                    QUESTION:
                  </div>
                  <p className="text-gray-700 text-base text-left leading-loose">
                    {conversation.prompt}
                  </p>
                </div>
                <div className="w-full rounded-lg overflow-y-auto shadow-lg border-2 border-solid border-gray-400 py-2 mt-0 mb-6">
                  <div className="px-6 py-4">
                    <div className="font-bold text-lg mb-2 text-left">
                      ANSWER:
                    </div>
                    {index === conversations.length - 1 && currentResponse && !loading ? (
                      <div className="text-gray-700 text-base text-left">
                        <Markdown remarkPlugins={[remarkGfm]}>
                          {typedResponse}
                        </Markdown>
                      </div>
                    ) : (
                      <p className="text-gray-700 text-base text-left">
                        <Markdown remarkPlugins={[remarkGfm]}>
                          {conversation.response}
                        </Markdown>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="w-full rounded-lg overflow-y-auto shadow-lg border-2 border-solid border-gray-400 py-2 mt-0 mb-6">
                <div className="px-6 py-4">
                  <div className="font-bold text-lg mb-2 text-left">
                    ANSWER:
                  </div>
                  <div className="space-y-2">
                    <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
                    <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
                    <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
                    <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
            <div className="relative w-full mt-6">
              <input
                type="text"
                value={searchTerm}
                placeholder="Ask anything"
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full py-3 pl-4 pr-20 text-lg text-gray-700 bg-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 shadow-[2px_2px_38px_0px_rgba(0,0,0,0.25),0px_-2px_4px_0px_rgba(0,0,0,0.25)_inset,1px_2px_4px_0px_rgba(0,0,0,0.25)_inset]"
              />
              <button
                onClick={handleSearch}
                className="absolute top-13 right-0.5 mt-[-47px] mr-1 flex justify-center items-center w-15 h-15 bg-[#333333] text-white text-lg font-bold p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaArrowRight />
              </button>
              <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 text-xs text-gray-500 ">
                Powered by Together AI
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
