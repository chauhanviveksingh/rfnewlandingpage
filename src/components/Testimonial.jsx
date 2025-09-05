import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya Chaudhary",
    review:
      "I was travelling with my elderly parents from Kanpur to Delhi. We decided to order Food from Railfeast. After we had our meal, they were quite happy with the Food we received. They were in doubt at first but loved the hot Food which tasted like home-cooked Food. Thank you, Railfeast!",
    rating: 5,
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop",
    date: "Aug 2025",
  },
  {
    name: "Amit Mishra",
    review:
      "One of my friends recommended me “Railfeast”, since then I only order from them when I am travelling. The App, as well as the website, has an easy ordering process with tasty meals. We ordered for our entire tour group while travelling from Kolkata to Nagpur, and everything came on time. Loved their great service!",
    rating: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    date: "Jul 2025",
  },
  {
    name: "Meenal Thakur",
    review:
      "As a solo traveller, I have been facing food quality issues, so while IRCTC Food Order online during my Train journey to Jaipur, I was worried about the food quality because I didn't want my trip to be spoiled due to my health issues caused by bad quality food. However, Railfeast delivered the best quality food, which was clean, fresh, and safe to eat. I would highly recommend their service and food on Train.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
    date: "Jun 2025",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-auto bg-white py-8 px-6 md:px-10">
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-[#cb212e] mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        What Customers Say – Testimonials & Ratings
      </motion.h2>

      {/* Active Review Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="flex flex-col items-center md:items-center gap-8 max-w-4xl"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
        >
          {/* Main Image for Active Review */}
          <motion.img
            src={reviews[activeIndex].img}
            alt={reviews[activeIndex].name}
            className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-[0_8px_16px_rgba(100,100,100,0.6)]"
            variants={itemVariants}
          />
          {/* Review text */}
          <motion.div
            className="flex flex-col text-center"
            variants={itemVariants}
          >
            <p className="font-semibold text-2xl text-gray-800">
              {reviews[activeIndex].name}
            </p>
            <p className="text-lg md:text-xl text-gray-700 mt-2 max-w-xl">
              {reviews[activeIndex].review}
            </p>
            {/* Stars */}
            <div className="flex justify-center mt-3">
              {Array.from({ length: reviews[activeIndex].rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-[#cb212e] mt-2">{reviews[activeIndex].date}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
