import React, { useState } from "react";
import GridMaker from "../components/GridMaker";

const AlgoVisualizer = () => {
  const [algo, setAlgo] = useState("dfs");
  const [clicked, setClicked] = useState(false); // Fix initial state
  const [reset,setReset]=useState(false)
  return (
    <div className="w-[90%] mx-auto">
      {/* Algorithm Selection */}
      <div className="flex md:flex-row flex-col justify-between gap-4 my-4">
        <button
          className={`px-8 py-2 rounded-md ${
            algo === "dfs"
              ? "bg-blue-700 border-2 border-black scale-105"
              : "bg-blue-500"
          } text-white`}
          onClick={() => setAlgo("dfs")}
        >
          Depth First Search
        </button>
        <button
          className={`px-8 py-2 rounded-md ${
            algo === "bfs"
              ? "bg-blue-700 border-2 border-black scale-105"
              : "bg-blue-500"
          } text-white`}
          onClick={() => setAlgo("bfs")}
        >
          Breadth First Search
        </button>
        <button
          className={`px-8 py-2 rounded-md ${
            algo === "dijkstra"
              ? "bg-blue-700 border-2 border-black scale-105 shadow-md"
              : "bg-blue-500"
          } text-white`}
          onClick={() => setAlgo("dijkstra")}
        >
          Dijkstra's Algorithm
        </button>
      </div>

      {/* Display Selected Algorithm */}
      <div className="text-center text-lg font-semibold text-blue-700 my-4">
        Selected Algorithm: {algo.toUpperCase()}
      </div>

      {/* Legend */}
      <div className="flex md:flex-row flex-col-reverse mb-10">
        <div className="md:w-[50%] w-full flex justify-center items-center md:mt-2 md:mb-2">
          <div className="w-[90%] gap-4 border px-8 py-16 text-xl rounded-lg shadow-lg ">
            <p className="flex items-center gap-2">
              1. Choose Start{" "}
              <span className="w-[20px] h-[20px] bg-green-500 inline-block"></span>
            </p>
            <p className="flex items-center gap-2">
              2. Choose Target{" "}
              <span className="w-[20px] h-[20px] bg-red-500 inline-block"></span>
            </p>
            <p className="flex items-center gap-2">
              3. Choose Walls{" "}
              <span className="w-[20px] h-[20px] bg-black inline-block"></span>
            </p>
            <div
              className="w-full text-white bg-blue-500 rounded-xl text-xl text-center py-2 mt-4 cursor-pointer"
              onClick={() => setClicked((prev) => !prev)}
            >
              Let's Go
            </div>
            <div
              className="w-full text-white bg-red-500 rounded-xl text-xl text-center py-2 mt-4 cursor-pointer"
              onClick={() => {
                setClicked(false); // Ensure no algorithm is running
                setReset((prev) => !prev);
              }}
            >
              Reset
            </div>
          </div>
        </div>
        {/* Grid section with selected algorithm passed as a prop */}
        <GridMaker algo={algo} clicked={clicked} reset={reset} />
      </div>
    </div>
  );
};

export default AlgoVisualizer;
