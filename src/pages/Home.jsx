import React from 'react'
import home from '../assets/home.png'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="w-full">
      <div className="w-[90%] flex  md:flex-row flex-col-reverse mx-auto">
        <div className="md:w-[40%] w-full content flex justify-center items-center">
          <div className="flex flex-col w-[95%]">
            <div className="md:text-6xl font-semibold text-4xl md:mt-0 mt-8">Algo Illustraitor</div>
            <div className="mt-4 md:text-xl text-md">Helps you visualize algorithms</div>
            <div className="flex flex-col">
              <Link to="/algovisualizer" className="bg-blue-500 text-white text-xl rounded-3xl px-4 py-1 w-[60%] text-center mt-5 cursor-pointer hover:scale-105" >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-[60%] w-full flex justify-center items-center">
          <img src={home} alt="home page image" className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default Home
