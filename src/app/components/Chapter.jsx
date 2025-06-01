import { motion, AnimatePresence, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
export function Chapter({ chapter }) {
	return (
		<div>
			<div className="mb-8 text-4xl font-bold ">Meet the team</div>

			<div className="grid grid-cols-12 gap-4 md:gap-4">
				{chapter?.team?.map((speaker) => (
					// <Link
					// 	key={speaker.name}
					// 	to={speaker.name}
					// 	className="col-span-6 rounded-xl border-2 p-2 transition hover:border-gray-600 focus:border-gray-900 dark:border-gray-800 dark:hover:border-gray-600 dark:focus:border-gray-500 md:col-span-3 lg:col-span-2"
					// >
					<div
						key={speaker.name}
						className=" col-span-6 rounded-xl border-2 p-2 transition hover:border-gray-600 focus:border-gray-900 dark:border-gray-800 dark:hover:border-gray-600 dark:focus:border-gray-500 md:col-span-3 lg:col-span-2"
						style={{ border: `2px solid ${chapter.color}` }}
					>
						<img
							style={{
								objectPosition: "center top",
							}}
							src={speaker.imageSmall.url}
							alt=""
							className="mb-2 aspect-[12/16] w-full rounded-lg object-cover sm:aspect-[12/16]"
							loading="lazy"
						/>
						<div className="text-center -mt-12">
						<div className="font-bold">{speaker.name}</div>
						{/* <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
								@{speaker.twitterUsername}
							</div> */}
						<div className="text-sm">
							{speaker.title}
							{false && `, ${speaker.company.name}`}
						</div>
						</div>
					</div>
					// </Link>
				))}
			</div>
		</div>
	);
}

export function Events({ chapter }) {
	const scrollRef = useRef(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [expandedIndex, setExpandedIndex] = useState(null);
	
	if (!chapter?.latestActivities || chapter.latestActivities.length === 0) {
		console.log("No events found");
		return null;
	}

	const sortedEvents = [...chapter.latestActivities]
		.filter((event) => event["Event Date"])
		.map((event) => ({
			...event,
			parsedDate: new Date(event["Event Date"]),
		}))
		.sort((a, b) => b.parsedDate - a.parsedDate);

	const scrollLeft = () => {
		if (scrollRef.current) {
			const cardWidth = window.innerWidth < 640 ? 280 : window.innerWidth < 768 ? 290 : 340;
			scrollRef.current.scrollBy({
				left: -cardWidth,
				behavior: "smooth",
			});
			setCurrentIndex((prev) => Math.max(prev - 1, 0));
		}
	};

	const scrollRight = () => {
		if (scrollRef.current) {
			const cardWidth = window.innerWidth < 640 ? 280 : window.innerWidth < 768 ? 290 : 340;
			scrollRef.current.scrollBy({
				left: cardWidth,
				behavior: "smooth",
			});
			setCurrentIndex((prev) => Math.min(prev + 1, sortedEvents.length - 1));
		}
	};

	return (
		<div className="relative flex flex-col items-center py-12">
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="mb-6 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white"
			>
				Latest Activities 
			</motion.div>

			<div className="relative flex w-full items-center justify-center">
				<button
					onClick={scrollLeft}
					className="absolute left-2 sm:left-4 z-10 rounded-full bg-white p-2 sm:p-3 shadow-lg transition hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
				>
					◀
				</button>

				<div
					ref={scrollRef}
					className="flex w-full space-x-3 sm:space-x-4 md:space-x-6 overflow-x-auto scroll-smooth px-10 mx-10 py-2 custom-scrollbar"
					style={{ scrollSnapType: 'x mandatory' }}
				>
					{sortedEvents.map((event, index) => (
						<motion.div
							key={event["Event Title"]}
							className="group relative flex-shrink-0 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all ease-in-out hover:shadow-2xl"
							whileHover={{ scale: 1.02 }}
							style={{
								backgroundImage: `url(${event["Event_image"]})`,
								backgroundSize: 'contain',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
								scrollSnapAlign: 'start'
							}}
						>
							{/* Dark overlay for better text readability */}
							  <div className="absolute inset-0  bg-black/20 group-hover:bg-black/60 transition-all duration-300"></div>
							
							{/* Content overlay - hidden by default, shown on hover */}
							<div className="absolute inset-0 backdrop-blur-lg flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 text-center p-4 sm:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
								<div className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-lg">
									<p className="break-words leading-tight">{event["Event Title"]}</p>
								</div>
								
								<p className="text-sm sm:text-base text-gray-200 drop-shadow-md">
									{event.parsedDate.toDateString()}
								</p>
								
								<a
									href={event["Event URL"]}
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 shadow-lg cursor-pointer z-20"
								>
									<span>View Event</span>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
								</a>
							</div>
							
							{/* Subtle gradient overlay at bottom for depth */}
							<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
						</motion.div>
					))}
				</div>

				<button
					onClick={scrollRight}
					className="absolute right-2 sm:right-4 z-10 rounded-full bg-white p-2 sm:p-3 shadow-lg transition hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
				>
					▶
				</button>
				
				<div className="absolute left-0 top-0 h-full w-8 sm:w-12 md:w-20 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-900 pointer-events-none z-10"></div>
				<div className="absolute right-0 top-0 h-full w-8 sm:w-12 md:w-20 bg-gradient-to-l from-gray-100 to-transparent dark:from-gray-900 pointer-events-none z-10"></div>
			</div>

			<style jsx>{`
				.custom-scrollbar::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</div>
	);
}

  export function EventsPast({ chapter }) {
	if (chapter?.events?.length === 0) return null;

	return (
		<div className="relative flex flex-col items-center py-12">
			<div className="mb-8 text-4xl font-bold">Events History</div>
			<div className="not-prose w-full">
				<div className="overflow-auto rounded-lg shadow-md">
					<table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
						<thead className="bg-white text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Title
								</th>
								<th scope="col" className="px-6 py-3">
									Date
								</th>
								{/* <th scope="col" className="px-6 py-3">
									Report
								</th> */}
							</tr>
						</thead>
						<tbody>
							{chapter?.events?.map((event) => (
								<tr className="border-b bg-white last:border-b-0 dark:border-gray-700 dark:bg-gray-800">
									<td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
										{event["Event Title"]}
									</td>
									<td className="whitespace-nowrap px-6 py-4">
										{event["Event Date"]}
									</td>
									{/* <td className="whitespace-nowrap px-6 py-4 line-clamp-1">
										<a
											href={event["Event URL"]}
											target="_blank"
											rel="noreferrer"
											className="underline"
										>
											{event["Event URL"]}
										</a>
									</td> */}
								</tr>
							))}

							{/* <tr className="bg-white dark:bg-gray-800">
							<th
								scope="row"
								className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
							>
								Magic Mouse 2
							</th>
							<td className="px-6 py-4">Black</td>
							<td className="px-6 py-4">Accessories</td>
						</tr> */}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
