import { useState } from "react";
import { motion } from "framer-motion";
import "./Awardmap.css";



export function AwardsMap({ awards }) {
	const [showAll, setShowAll] = useState(false);
	const visibleAwards = showAll ? awards : awards.slice(0, 3);

	return (
	<>
			<div className="relative mx-auto w-full max-w-7xl px-4 sm:px-8 py-16">
			{/* Vertical Timeline Line */}
			<div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 transform bg-gradient-to-b from-blue-400 to-purple-500 opacity-60"></div>

			{/* Awards List */}
			<div className="flex flex-col gap-16">
				{visibleAwards.map((award, index) => {
					const isLeft = index % 2 === 0;
					return (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className={`relative flex flex-col md:flex-row items-center ${
								isLeft ? "md:flex-row-reverse" : ""
							}`}
						>
							{/* Dot */}
							<div className="absolute top-0 md:top-20 left-1/2 h-4 w-4 md:h-6 md:w-6 -translate-x-1/2 transform rounded-full border-[4px] border-white bg-blue-500 shadow-lg dark:border-gray-900 z-10"></div>

							{/* Line connector */}
							<div
								className={`absolute top-5 md:top-24 h-[2px] w-10 sm:w-16 bg-gray-300 dark:bg-gray-600 z-0 ${
									isLeft ? "left-1/2" : "right-1/2"
								}`}
							/>

							{/* Card */}
							<div
								className={`relative w-full md:w-1/2 p-6 sm:p-8 pt-12 md:pt-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 ${
									isLeft ? "md:pr-12" : "md:pl-12"
								} bg-white dark:bg-gray-900 transition hover:scale-[1.02]`}
							>
								<div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
									<img
										src={award.urlimage}
										alt={award.name}
										className="w-full max-w-xs sm:w-50 h-full rounded-md object-cover border border-gray-300 dark:border-gray-700"
									/>
									<div className="text-center sm:text-left">
										<h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">
											{award.name}
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
											{award.date}
										</p>
										{award.description && (
											<p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
												{award.description}
											</p>
										)}
									</div>
								</div>
							</div>
						</motion.div>
					);
				})}

				{/* See More Button */}
				
			</div>
	
		</div>
				{!showAll && awards.length > 3 && (
					<div className="mt-6 text-center border-t-2 border-grey-600 relative mx-auto w-full max-w-7xl px-4 sm:px-8 py-1">
						<button
							onClick={() => setShowAll(true)}
							className="mt-6 rounded-full border-2 border-blue-600 px-6 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
						>
							See More Awards
						</button>
					</div>
				)}
	</>
	);
}
