import React, { useState, useEffect } from "react";

const GridMaker = ({ algo, clicked , reset }) => {
  const gridSize = 15;
  const [start, setStart] = useState(null);
  const [target, setTarget] = useState(null);
  const [walls, setWalls] = useState(new Set());
  const [gridState, setGridState] = useState({});
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (clicked) {
      console.log("Lets go clicked", { start, target });
      startPathfinding();
    }
  }, [clicked]); // Run when `clicked` changes
  
  useEffect(()=>{
    if(reset){
      console.log("Reset Clicked");
      setStart(null);
      setTarget(null);
      setWalls(new Set());
      setGridState({});
      setRunning(false);
    }
  },[reset]);
  
  const startPathfinding = () => {
    if (!start || !target) {
      alert("Please select both start and target!");
      return;
    }
    setRunning(true);
    if (algo === "dfs") {
      dfs();
    } else if (algo === "bfs") {
      bfs();
    } else if (algo === "dijkstra") {
      dijkstra();
    } else {
      alert("Algorithm not implemented yet");
    }
  };

  // Depth-First Search (DFS)
  const dfs = async () => {
    if (!start || !target) return;

    const stack = [{ row: start.row, col: start.col, path: [] }];
    const visited = new Set();

    while (stack.length > 0) {
      const { row, col, path } = stack.pop();
      const cellId = `${row}-${col}`;

      if (
        row < 0 ||
        row >= gridSize ||
        col < 0 ||
        col >= gridSize ||
        walls.has(cellId) ||
        visited.has(cellId)
      ) {
        continue;
      }

      visited.add(cellId);
      setGridState((prev) => ({ ...prev, [cellId]: "visited" }));
      await sleep(50);

      if (row === target.row && col === target.col) {
        for (let [i, j] of path) {
          setGridState((prev) => ({ ...prev, [`${i}-${j}`]: "path" }));
          await sleep(50);
        }
        return;
      }

      stack.push({ row: row + 1, col, path: [...path, [row, col]] });
      stack.push({ row: row - 1, col, path: [...path, [row, col]] });
      stack.push({ row, col: col + 1, path: [...path, [row, col]] });
      stack.push({ row, col: col - 1, path: [...path, [row, col]] });
    }
  };

  // Breadth-First Search (BFS)
  const bfs = async () => {
    if (!start || !target) return;
    console.log("BFS called");

    const queue = [{ row: start.row, col: start.col, path: [] }];
    const visited = new Set();

    while (queue.length > 0) {
      const { row, col, path } = queue.shift(); // Dequeue first element
      const cellId = `${row}-${col}`;

      // If already visited, skip
      if (visited.has(cellId)) continue;
      visited.add(cellId); // Mark as visited

      console.log("In queue", row, col); // Debugging

      // Skip if out of bounds or it's a wall
      if (
        row < 0 ||
        row >= gridSize ||
        col < 0 ||
        col >= gridSize ||
        walls.has(cellId)
      ) {
        continue;
      }

      setGridState((prev) => ({ ...prev, [cellId]: "visited" }));
      await sleep(50); // Animation delay

      // If target is found, animate path
      if (row === target.row && col === target.col) {
        console.log("Target Found!");
        for (let [i, j] of path) {
          setGridState((prev) => ({ ...prev, [`${i}-${j}`]: "path" }));
          await sleep(50);
        }
        return;
      }

      // Add neighbors to queue
      queue.push({ row: row + 1, col, path: [...path, [row, col]] });
      queue.push({ row: row - 1, col, path: [...path, [row, col]] });
      queue.push({ row, col: col + 1, path: [...path, [row, col]] });
      queue.push({ row, col: col - 1, path: [...path, [row, col]] });

      console.log("Neighbors added"); // Debugging
    }
  };

  const dijkstra = async () => {
    if (!start || !target) return;

    const priorityQueue = [
      { row: start.row, col: start.col, cost: 0, path: [] },
    ];
    const distances = {};
    const visited = new Set();

    distances[`${start.row}-${start.col}`] = 0;

    while (priorityQueue.length > 0) {
      priorityQueue.sort((a, b) => a.cost - b.cost);
      const { row, col, cost, path } = priorityQueue.shift();
      const cellId = `${row}-${col}`;

      if (visited.has(cellId)) continue;
      visited.add(cellId);

      // Skip if out of bounds or it's a wall
      if (
        row < 0 ||
        row >= gridSize ||
        col < 0 ||
        col >= gridSize ||
        walls.has(cellId)
      ) {
        continue;
      }

      setGridState((prev) => ({ ...prev, [cellId]: "visited" }));
      await sleep(50);

      if (row === target.row && col === target.col) {
        for (let [i, j] of path) {
          setGridState((prev) => ({ ...prev, [`${i}-${j}`]: "path" }));
          await sleep(50);
        }
        return;
      }

      const neighbors = [
        { row: row + 1, col, cost: cost + 1 },
        { row: row - 1, col, cost: cost + 1 },
        { row, col: col + 1, cost: cost + 1 },
        { row, col: col - 1, cost: cost + 1 },
      ];

      for (const neighbor of neighbors) {
        const neighborId = `${neighbor.row}-${neighbor.col}`;
        if (
          !visited.has(neighborId) &&
          (!distances[neighborId] || distances[neighborId] > neighbor.cost)
        ) {
          distances[neighborId] = neighbor.cost;
          priorityQueue.push({ ...neighbor, path: [...path, [row, col]] });
        }
      }
    }
  };



  // Sleep helper for animation
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="w-full flex justify-center items-center">
      <div className="grid grid-cols-15 gap-[2px] mt-4">
        {Array.from({ length: gridSize * gridSize }, (_, index) => {
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;
          const cellId = `${row}-${col}`;

          let bgColor = "bg-white";
          if (start && start.row === row && start.col === col)
            bgColor = "bg-green-500"; // Start
          else if (target && target.row === row && target.col === col)
            bgColor = "bg-red-500"; // Target
          else if (walls.has(cellId)) bgColor = "bg-black"; // Walls
          else if (gridState[cellId] === "visited")
            bgColor = "bg-blue-500"; // Visited
          else if (gridState[cellId] === "path") bgColor = "bg-yellow-500"; // Path

          return (
            <div
              key={cellId}
              onClick={() => {
                if (!start) setStart({ row, col });
                else if (!target) setTarget({ row, col });
                else setWalls((prevWalls) => new Set([...prevWalls, cellId]));
              }}
              className={`w-[30px] h-[30px] border-2 border-gray-700 cursor-pointer ${bgColor}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default GridMaker;
