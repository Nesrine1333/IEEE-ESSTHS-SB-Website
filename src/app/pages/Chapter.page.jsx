import {  useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { Chapter, Events } from "../components/Chapter";

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
      className=" flex items-center justify-center gap-3 text-white h-[35vh] sm:min-h-[30vh] s:h-[26vh] mt-5"
      style={{
        background: `linear-gradient(20deg, ${currentChapter.color},${currentChapter.variantcolor})`,
        backgroundSize: "200% 200%",
      }}
      initial={{ opacity:1, scale: 1 }}
      animate={{
        opacity: 1,
        scale: 1,
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 2, // Duration of one full cycle
        ease: "linear",
        repeat: Infinity, // Keeps looping
      }}
    >
	<div	className=" image_container  ">
	<img src={currentChapter.momos} className="image" alt=""/>
	</div>
	<div className="flex items-center justify-center w-1/2">
	
	  
      <motion.div
        initial={{ rotate: -45, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* <FontAwesomeIcon icon={faExternalLink} className="text-xl text-white" /> */}
      </motion.div>
      <motion.h2
        className="text-center text-4xl font-bold text-white"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
		
      >
	
        {currentChapter.name}
      </motion.h2>
	  </div>
    </motion.div>
	<div  className="m-7 lg:px-20 sm:px-10 lg:py-20 sm:py-5">
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
			<div className="h-10"></div>
			

	</div>
	<Events chapter={currentChapter} />
			{/* <div className="mb-12">
				<ExCom />
			</div>
			<div>
				<Chairs />
			</div> */}
		</div>
	);
}





