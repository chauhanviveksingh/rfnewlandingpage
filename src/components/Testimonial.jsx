import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Amit Sharma",
    review: "Excellent service, I’m really happy with the support and quality!",
    rating: 5,
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "Aug 2025",
  },
  {
    name: "Divya Singh",
    review: "Very smooth process and customer care was very supportive.",
    rating: 4,
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "Jul 2025",
  },
  {
    name: "Ravi Kumar",
    review: "Great experience overall. I’ll definitely recommend this.",
    rating: 5,
    img: "https://randomuser.me/api/portraits/men/65.jpg",
    date: "Jun 2025",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-auto min-h-auto bg-white p-6 md:p-10">
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-red-600 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Testimonials
      </motion.h2>

      {/* Vertical Avatar Strip */}
      <div className="overflow-hidden h-[300px] w-full flex justify-center mb-10">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ y: 0 }}
          // Animate with a precise offset to perfectly center the active image
          // 104px is the height of the item (80px) plus the gap (24px)
          animate={{ y: `-${activeIndex * 104}px` }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          {reviews.map((review, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={i}
                className={`flex-shrink-0 flex flex-col items-center cursor-pointer transition-all duration-500`}
                onClick={() => setActiveIndex(i)}
                style={{
                  opacity: isActive ? 1 : 0.3,
                  transform: `scale(${isActive ? 1.2 : 0.8})`
                }}
              >
                <img
                  src={review.img}
                  alt={review.name}
                  className="rounded-full shadow-lg border-4 border-red-500"
                />
                <p className="mt-2 text-sm font-medium text-gray-700 text-center">
                  {review.name}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Active Review Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-4xl"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
        >
          {/* Review text */}
          <motion.div
            className="flex flex-col text-center md:text-left"
            variants={itemVariants}
          >
            <p className="font-semibold text-2xl text-gray-800">
              {reviews[activeIndex].name}
            </p>
            <p className="text-lg md:text-xl text-gray-700 mt-2 max-w-xl">
              {reviews[activeIndex].review}
            </p>
            {/* Stars */}
            <div className="flex justify-center md:justify-start mt-3">
              {Array.from({ length: reviews[activeIndex].rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-red-500 mt-2">{reviews[activeIndex].date}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
