import {  useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { Chapter, Events,EventsPast } from "../components/Chapter";

import "./Chatpter.css"
import {chapters} from "../data/chatpers";
import { useEffect } from "react";



export default function ChapterPage() {

	  
	
	const { chapterSlug } = useParams();
	const currentChapter = chapters.find((s) => s.slug === chapterSlug);
	useEffect(() => {
		const faviconMap = {
				"*": "/favicon-32x32.png",
			"cs": "/assets/chaptericon/cs.png",
			"wie": "/assets/chaptericon/wie_icons.png",
			"aess": "/assets/chaptericon/aessold.png",
			"ras": "/assets/chaptericon/icon_ras.png",
			"iip": "/assets/chaptericon/iip.jpg",
			"sight": "/assets/chaptericon/sight.png",
		  };
		console.log('chapterSlug',chapterSlug)
		const currentChaptericon = chapters.find((s) => s.slug === chapterSlug);
		const favicon = document.querySelector("link[rel='icon']");
		if (favicon && currentChaptericon) {
		  favicon.href = faviconMap[chapterSlug] ; // Default favicon
		}else if (chapterSlug ==="undefined") {
			favicon.href = faviconMap[0] ;
		}
	  }, [chapterSlug]);
	const navigate = useNavigate();
	

	if (!currentChapter) {
		return navigate("/");
	}

	return (
		<div className="py-40">
		
	<motion.div
  className="flex items-center justify-center gap-1 text-white h-[25vh] sm:h-[30vh] md:h-[26vh] mt-5 px-4"
  style={{
    background: `linear-gradient(20deg, ${currentChapter.color}, ${currentChapter.variantcolor})`,
    backgroundSize: "200% 200%",
  }}
  initial={{ opacity: 1, scale: 1 }}
  animate={{
    opacity: 1,
    scale: 1,
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  }}
  transition={{
    duration: 2,
    ease: "linear",
    repeat: Infinity,
  }}
>
  <div className="w-[30%]  h-[150%] flex justify-center">
    <img
    fetchpriority="high"
      src={currentChapter.momos}
      alt=""
      className="w-full sm:w-[120px] md:w-[200px] h-full object-contain z-10"
    />
  </div>

  <div className="flex items-center justify-start w-[50%] ">
  

    <motion.h2
      className="text-white  text-2xl sm:text-xl lg:text-6xl md:text-5xl font-bold text-left leading-tight"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {currentChapter.name}
    </motion.h2>
  </div>
</motion.div>


	<div  className="m-7 lg:px-20 sm:px-10 lg:py-t-20 sm:py-t-5">
	<motion.div
        className="text-left lg:text-2xl md:text-xl sm:text-lg font-demi text-black py-10"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.3 }}
		
      >
	
        {currentChapter.descpt}
      </motion.div>
			{/* <div className="flex items-center justify-center">
				<img
					className="mb-8 rounded-2xl object-cover shadow-lg md:h-[42rem]"
					src={currentChapter.excom_image}
					alt=""
				/>
			</div> */}
			<Chapter chapter={currentChapter} />
		
			

	</div>
	 <Events chapter={currentChapter} /> 
{/* <div  className="m-7 lg:px-20 sm:px-10 lg:py-20 sm:py-5">

		
	<EventsPast chapter={currentChapter} />
</div> */}


			{/* <div className="mb-12">
				<ExCom />
			</div>
			<div>
				<Chairs />
			</div> */}
		</div>
	);
}





