import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function EventSb({ chapter }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 1; // Adjust scrolling speed
    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft -= scrollContainer.scrollWidth / 2; // Smooth reset
      }
      scrollContainer.scrollLeft += scrollSpeed;
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);
  
  if (chapter.length === 0) return null;

  const sortedEvents = [...chapter]
    .filter((event) => event["Event Date"])
    .map((event) => ({ ...event, parsedDate: new Date(event["Event Date"]) }))
    .sort((a, b) => b.parsedDate - a.parsedDate);

  // Duplicate events for infinite scrolling effect
  const infiniteEvents = [...sortedEvents, ...sortedEvents];

  return (
    <>
      {expandedIndex !== null && (
        <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-md p-4">
          <div
            className="absolute inset-0"
            onClick={() => setExpandedIndex(null)}
          ></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative z-50 mx-4 flex w-full max-w-3xl flex-col items-center justify-center rounded-lg bg-white p-4 sm:p-6 text-center shadow-xl dark:bg-gray-900"
          >
            <div
              className="background_events mb-4 h-40 w-full rounded bg-cover bg-center sm:h-60 md:h-80"
              style={{
                backgroundImage: `url(${sortedEvents[expandedIndex]["Event_image"]})`,
              }}
            ></div>
            <button
              onClick={() => setExpandedIndex(null)}
              className="absolute top-2 right-4 sm:top-4 sm:right-6 text-2xl sm:text-3xl font-bold text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            >
              ×
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white px-2">
              {sortedEvents[expandedIndex]["Event Title"]}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {sortedEvents[expandedIndex].parsedDate.toDateString()}
            </p>
            <a
              href={sortedEvents[expandedIndex]["Event URL"]}
              target="_blank"
              rel="noreferrer"
              className="mt-4 sm:mt-6 rounded-lg bg-blue-500 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white transition hover:bg-blue-600"
            >
              View Event
            </a>
          </motion.div>
        </div>
      )}

      <div className="flex flex-col items-center py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold text-center px-4"
        >
          Past Events
        </motion.div>

        <div
          ref={scrollRef}
          className="custom-scrollbar relative flex w-full space-x-3 sm:space-x-4 md:space-x-6 overflow-x-auto scroll-smooth p-2 sm:p-4"
        >
          {infiniteEvents.map((event, index) => (
            <motion.div
              key={`${event["Event Title"]}-${index}`}
              className="flex min-w-[16rem] sm:min-w-[20rem] md:min-w-[24rem] lg:min-w-[30rem] flex-col items-center justify-center rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 text-center shadow-lg transition-all ease-in-out dark:bg-gray-800 cursor-pointer hover:shadow-xl"
              onClick={() => setExpandedIndex(index % sortedEvents.length)}
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="background_events h-32 w-full rounded bg-cover bg-center sm:h-40 md:h-48 lg:h-60" 
                style={{ backgroundImage: `url(${event["Event_Image"]})` }} 
              ></div>
              
              {/* Event details - shown on larger screens */}
              <div className="mt-3 sm:mt-4 hidden sm:block">
                <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  <p className="line-clamp-2">{event["Event Title"]}</p>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  {event.parsedDate.toDateString()}
                </p>
                <a
                  href={event["Event URL"]}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs sm:text-sm text-blue-500 underline transition hover:text-blue-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Event
                </a>
              </div>
            </motion.div>
          ))}
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
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  );
}