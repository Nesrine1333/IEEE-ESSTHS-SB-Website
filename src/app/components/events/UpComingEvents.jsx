import { motion } from "framer-motion";
import { useState, useRef, useEffect,useCallback } from "react";
import "./UpComingEvents.css";

export function UpEvents({ chapter }) {
  	const [selectedEvent, setSelectedEvent] = useState(null);

	if (chapter.length === 0) return null;



	if (chapter.length === 0) return null;



	const sortedEvents = [...chapter]
		.filter((event) => event["Event Date"])
		.map((event) => ({
			...event,
			parsedDate: new Date(event["Event Date"]),
		}))
		.sort((a, b) => b.parsedDate - a.parsedDate);

	const loopedEvents = [
		sortedEvents[sortedEvents.length - 1],
		...sortedEvents,
		sortedEvents[0], 
		sortedEvents[1],
	];




	return (
		<>
			{selectedEvent && (
	<div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
		<div
			className="absolute inset-0"
			onClick={() => setSelectedEvent(null)}
		></div>
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}
			className="relative z-50 mx-4 w-full max-w-3xl rounded-lg bg-white p-4 sm:p-6 text-center shadow-xl dark:bg-gray-900 overflow-y-auto max-h-[90vh]"
		>
			<button
				onClick={() => setSelectedEvent(null)}
				className="absolute top-4 right-6 text-2xl sm:text-3xl font-bold text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
			>
				×
			</button>

			<div className="flex flex-col items-center gap-4">
				{/* Image */}
				{selectedEvent["Event_pdp"] && (
					<img
						src={selectedEvent["Event_pdp"]}
						alt=""
						className="w-full max-h-[250px] object-cover rounded-md sm:max-h-[300px]"
					/>
				)}

				{/* Title */}
				<h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white text-center">
					{selectedEvent["Event Title"]}
				</h2>

				{/* Date and state */}
				<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
					{selectedEvent.parsedDate.toDateString()} – This activity is{" "}
					<span className="font-medium">{selectedEvent.State}</span>
				</p>

				{/* Description */}
				<p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 px-2 sm:px-4">
					{selectedEvent["desrip"]}
				</p>

				{/* Button */}
				<a
					href={selectedEvent["Event_link"]}
					target="_blank"
					rel="noreferrer"
					className="mt-4 inline-block w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
				>
					View Event
				</a>
			</div>
		</motion.div>
	</div>
)}


			<SmoothScrollEvents
				onExtend={setSelectedEvent}
				loopedEvents={loopedEvents}
			/>
		</>
	);
}
const SmoothScrollEvents = ({ loopedEvents, onExtend }) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const userScrollTimeoutRef = useRef(null);
  
  // Touch handling state
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchThreshold = 50; // Minimum swipe distance

  const handleUserScroll = useCallback((e) => {
    console.log('user scrolling');
    e.preventDefault(); // Prevent default scroll behavior
    
    if (!userInteracted) setUserInteracted(true);

    // Clear existing timeouts
    if (userScrollTimeoutRef.current) clearTimeout(userScrollTimeoutRef.current);

    const deltaY = e.deltaY;
    
    // Determine scroll direction and update currentIndex
    if (deltaY > 0) {
      // Scrolling down/right - go to next element
      setCurrentIndex((prev) => (prev + 1) % loopedEvents.length);
    } else if (deltaY < 0) {
      // Scrolling up/left - go to previous element
      setCurrentIndex((prev) => (prev - 1 + loopedEvents.length) % loopedEvents.length);
    }

    // Resume auto-scroll after 3 seconds of no interaction
    userScrollTimeoutRef.current = setTimeout(() => {
      setUserInteracted(false);
    }, 3000);
  }, [userInteracted, loopedEvents.length]);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    
    // Determine if it's a horizontal swipe (more horizontal than vertical movement)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > touchThreshold) {
      e.preventDefault();
      
      if (!userInteracted) setUserInteracted(true);
      
      // Clear existing timeouts
      if (userScrollTimeoutRef.current) clearTimeout(userScrollTimeoutRef.current);
      
      if (deltaX > 0) {
        // Swiping right - go to previous element
        setCurrentIndex((prev) => (prev - 1 + loopedEvents.length) % loopedEvents.length);
      } else {
        // Swiping left - go to next element
        setCurrentIndex((prev) => (prev + 1) % loopedEvents.length);
      }
      
      // Resume auto-scroll after 3 seconds of no interaction
      userScrollTimeoutRef.current = setTimeout(() => {
        setUserInteracted(false);
      }, 3000);
    }
  }, [userInteracted, loopedEvents.length, touchThreshold]);

  // Auto-scroll effect
  useEffect(() => {
    if (userInteracted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loopedEvents.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [userInteracted, loopedEvents.length]);

  // Add wheel event listeners (desktop only)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Mouse wheel events for desktop
    container.addEventListener('wheel', handleUserScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleUserScroll);
    };
  }, [handleUserScroll]);

  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    // For 2 or fewer elements, don't center
    if (loopedEvents.length <= 2) return;
  
    const selectedElement = container.children[1]; // Middle element
    if (!selectedElement) return;

    const containerCenter = container.offsetWidth / 2;
    const elementCenter = selectedElement.offsetLeft + selectedElement.offsetWidth / 2;

    container.scrollTo({
      left: elementCenter - containerCenter,
      behavior: "smooth",
    });
  }, [currentIndex, loopedEvents.length]);

  // Get prev, current, next indexes cyclically
  const prevIndex = (currentIndex - 1 + loopedEvents.length) % loopedEvents.length;
  const nextIndex = (currentIndex + 1) % loopedEvents.length;

  const displayedEvents = [
    loopedEvents[prevIndex],
    loopedEvents[currentIndex],
    loopedEvents[nextIndex],
  ];

  // Navigation functions for arrows
  const goToPrevious = () => {
    if (!userInteracted) setUserInteracted(true);
    if (userScrollTimeoutRef.current) clearTimeout(userScrollTimeoutRef.current);
    
    setCurrentIndex((prev) => (prev - 1 + loopedEvents.length) % loopedEvents.length);
    
    userScrollTimeoutRef.current = setTimeout(() => {
      setUserInteracted(false);
    }, 3000);
  };

  const goToNext = () => {
    if (!userInteracted) setUserInteracted(true);
    if (userScrollTimeoutRef.current) clearTimeout(userScrollTimeoutRef.current);
    
    setCurrentIndex((prev) => (prev + 1) % loopedEvents.length);
    
    userScrollTimeoutRef.current = setTimeout(() => {
      setUserInteracted(false);
    }, 3000);
  };

  return (
    <div className="flex w-full flex-col items-center py-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6 text-4xl font-bold"
      >
        Latest Events
      </motion.div>

      <div className="relative flex w-full overflow-hidden justify-center self-center">
        {/* Left Arrow - visible on mobile/tablet */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 dark:bg-gray-800/80 dark:hover:bg-gray-800 md:hidden"
          aria-label="Previous event"
        >
          <svg
            className="h-6 w-6 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Right Arrow - visible on mobile/tablet */}
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 dark:bg-gray-800/80 dark:hover:bg-gray-800 md:hidden"
          aria-label="Next event"
        >
          <svg
            className="h-6 w-6 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          </button>
        <div
          ref={scrollRef}
          className="custom-scrollbar flex space-x-3 overflow-hidden scroll-smooth p-3 w-full justify-center self-center"
          style={{
            scrollbarWidth: "none",
            display: "flex",
            justifyContent: "center",
            padding: "0 50px",
            touchAction: "pan-y", // Allow vertical scrolling but handle horizontal ourselves
          }}
        >
          {displayedEvents.map((event, idx) => {
            const isActive = idx === 1;
            const scale = isActive ? 1 : 0.8;
            const baseOpacity = isActive ? 1 : 0.4;

            return (
              <motion.div
                key={event["Event Title"] + idx}
                onClick={() => onExtend(event)}
                className="flex min-w-[20rem] cursor-pointer transform flex-col items-center justify-center rounded-lg bg-white p-2 text-center shadow-lg dark:bg-gray-800 sm:min-w-[20rem] md:w-[30%] md:min-w-[20rem] hover:opacity-100"
                style={{
                  transform: `scale(${scale})`,
                  display: 'inline-block',
                  opacity: baseOpacity,
                  transition: "transform 0.4s ease-in-out, opacity 0.4s ease-in-out",
                }}
              >
                <div
                  className="background_events h-60 w-full rounded bg-cover bg-center"
                  style={{ backgroundImage: `url(${event["Event_image"]})` }}
                ></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {event["Event Title"]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {event.parsedDate?.toDateString()} - This activity is{" "}
                  {event.State}
                </p>
                <a
                  href={event["Event_link"]}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline transition hover:text-blue-700 cursor-pointer"
                >
                  View Event
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
};

export default SmoothScrollEvents;