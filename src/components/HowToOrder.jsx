import React from "react";
import { Train, Hamburger, ShoppingCart, Armchair } from "lucide-react";

const HowItWorksV3 = () => {
  const steps = [
    {
      title: "Enter PNR/Train",
      description: "Provide your PNR or train number and select your boarding date.",
      icon: <Train size={48} strokeWidth={1.5} />,
    },
    {
      title: "Choose Your Food",
      description: "Browse a variety of delicious meals from FSSAI-approved restaurants.",
      icon: <Hamburger size={48} strokeWidth={1.5} />,
    },
    {
      title: "Place Your Order",
      description: "Finalize your order with convenient online payment or Cash on Delivery.",
      icon: <ShoppingCart size={48} strokeWidth={1.5} />,
    },
    {
      title: "Get Food On Your Seat",
      description: "Your hot, fresh meal will be delivered directly to your train seat.",
      icon: <Armchair size={48} strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-white to-white py-16 px-6 lg:px-12 font-sans">
      {/* Full width container */}
      <div className="w-full text-center">
        <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
          How It Works
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Order fresh food on the go in just a few simple steps
        </p>
      </div>

      {/* Desktop timeline full width */}
      <div className="hidden lg:grid grid-cols-4 gap-8 mt-12 relative w-full">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center text-center px-4"
          >
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="absolute top-14 left-full w-full h-1 bg-gray-200"></div>
            )}
            {/* Step Circle */}
            <div className="flex items-center justify-center w-28 h-28 rounded-full bg-white text-[#cb212e] shadow-lg mb-6 z-10">
              {step.icon}
            </div>
            {/* Step Details */}
            <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile stacked cards full width */}
      <div className="lg:hidden mt-12 space-y-6 w-full">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition w-full"
          >
            {/* Icon Circle */}
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white text-[#cb212e] shadow-md">
              {step.icon}
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-800">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Main app wrapper
const App = () => {
  return (
    <div className="h-auto bg-gray-100">
      <HowItWorksV3 />
    </div>
  );
};

export default App;
