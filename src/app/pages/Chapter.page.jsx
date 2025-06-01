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
			"cs": "/csicons.png",
			"wie": "/wie_icons.png",
			"ras":"/icon_ras.png",
			"sight": "/assets/sight.png",
			"aess": "/aessold.png",
			"iip": "/assets/iip.png",
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
  className="flex items-center justify-center gap-3 text-white h-[25vh] sm:h-[30vh] md:h-[26vh] mt-5 px-4"
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
  <div className="w-auto flex justify-center">
    <img
      src={currentChapter.momos}
      alt=""
      className="w-[120px] sm:w-[120px] md:w-[150px] h-auto object-contain"
    />
  </div>

  <div className="flex items-center justify-center w-1/2">
  

    <motion.h2
      className="text-white text-2xl sm:text-2xl md:text-6xl font-bold text-center leading-tight"
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
        className="text-left lg:text-4xl md:text-xl sm:text-lg font-bold text-black py-10"
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
<div  className="m-7 lg:px-20 sm:px-10 lg:py-20 sm:py-5">

		
	<EventsPast chapter={currentChapter} />
</div>


			{/* <div className="mb-12">
				<ExCom />
			</div>
			<div>
				<Chairs />
			</div> */}
		</div>
	);
}





