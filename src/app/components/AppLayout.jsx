import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { motion } from "framer-motion";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";
import Chatbot from "../components/chatbot/chatbot";
import mosmos from "../../assets/mosmos.png";
import { twMerge } from "tailwind-merge";
import { images } from "../data/memories";
import React, { useEffect, Suspense, useRef, useState } from "react";



// import {
// 	Chart as ChartJS,
// 	LineElement,
// 	PointElement,
// 	LinearScale,
// 	CategoryScale,
// } from "chart.js";




// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

function TeamBuildingMemories() {
  const [imageRotations, setImageRotations] = useState([]);
  const [blurImages, setBlurImages] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    // Reduced rotation range from 20 to 8 degrees
    setImageRotations(images.map(() => Math.random() * 12 - 6));

    // Start blur after 3s
    const blurTimer = setTimeout(() => {
      setBlurImages(true);
    }, 3000);

    // Show title after 4.5s
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 4500);

    return () => {
      clearTimeout(blurTimer);
      clearTimeout(titleTimer);
    };
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-row sm:gap-0 items-center justify-center overflow-hidden">
      {/* Images block */}
      <div className="absolute top-0 z-0 flex flex-wrap justify-bewtween w-full flex-row items-center  self-center  sm: justify-center ">
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, rotate: -15, scale: 0.9, y: -50 }}
            animate={{
              opacity: 1,
              rotate: imageRotations[index],
              scale: 1,
              y: Math.random() * 20 - 10, // Random vertical offset
               filter: blurImages 
                 ? "blur(10px) brightness(1.5) contrast(0.8)" 
                 : "blur(0px)",
            }}
            transition={{
              duration: 0.8,
              delay: Math.random() * 0.3, // Random but smaller delay
              ease: "easeOut",
            }}
            className="flex flex-col items-center bg-white rounded-md shadow-[0_8px_25px_rgba(0,0,0,0.3)] p-1 sm:p-3 w-30 sm:w-50 md:w-60 transform hover:z-10 hover:scale-105 transition-transform"
            style={{ 
              zIndex: Math.floor(Math.random() * 10) + 1 // Random stacking order
            }}
          >
            <img
                  src={src}
                  alt={`Team memory ${index + 1}`}
                  className="w-48 h-36 sm:w-60 sm:h-42 md:w-64 md:h-48 lg:w-72 lg:h-54 object-cover rounded-lg shadow-lg border-4 border-white transform hover:scale-105 transition-transform duration-300"
                />
            <p className="mt-2 sm:mt-4 md:mt-6 text-xs sm:text-sm text-gray-600 italic text-center">
              ESSTHS IEEE
            </p>
          </motion.div>
        ))}
      </div>

      {/* Title block */}
      {showTitle && (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="z-10 text-center text-6xl sm:text-6xl md:text-6xl lg:text-8xl font-extrabold text-blue-700 px-4"
        >
          <motion.span
            initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="inline-block"
          >
            Welcome to
            <br /> IEEE ESSTHS SB
          </motion.span>
        </motion.h1>
      )}
    </div>
  );
}
  
export default function AppLayout({ children }) {
	const { pathname } = useLocation();
	const [showMemories, setShowMemories] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => {
		  setShowMemories(false);
		}, 7000); // Show for 3 seconds
	
		return () => clearTimeout(timer); // Cleanup the timer on unmount
	  }, []);
	return (
		<>
			{/* Chatbot with animation */}
	
{showMemories ?(<TeamBuildingMemories/>):(<div>

<div>
				<Navigation />

				<main>
					{/* Animated page content */}
	 <motion.div
				initial="initial"
				animate="in"
			
			>
				<Chatbot />
			</motion.div>
					{children}
					<Outlet />
				</main>

				<Footer />
			</div>

			<ScrollRestoration />
			
			<ReactQueryDevtools initialIsOpen={false} />
</div>)
		}	
		</>
	);
}
